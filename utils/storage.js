import localforage from 'localforage'
import { randomId } from '../editor/utils'
import { config } from '../editor/config'

export const activityStore = localforage.createInstance({
  name: 'activity',
})

export const projectsStore = localforage.createInstance({
  name: 'projects',
})

export const filesStore = localforage.createInstance({
  name: 'files',
})

export async function initStorage() {
  const activeProjectId = await activityStore.getItem('last_active_project')
  const activeFileId = await activityStore.getItem('last_active_file')

  const projects = await getAllProjects()
  if (!projects.length) {
    projects.push(await createProject())
  }

  const activeProject = projects.find((p) => {
    return p.id === activeProjectId
  }) ?? projects[0]

  const files = await getFilesByProjectId(activeProject.id)
  if (!files.length) {
    files.push(await createFile({
      project_id: activeProject.id,
      is_default: true,
    }))
  }

  const activeFile = files.find((f) => {
    return f.id === activeFileId
  }) ?? files[0]

  await activityStore.setItem('last_active_project', activeProject.id)
  await activityStore.setItem('last_active_file', activeFile.id)

  return {
    projects,
    files: files.map((file) => {
      // stripping out the content so we don't hold large files in memory
      return {
        id: file.id,
        project_id: file.project_id,
        name: file.name,
        type: file.type,
        created_at: file.created_at,
        last_modified: file.last_modified,
      }
    }),
    activeProject,
    activeFile,
  }
}

export async function getAllProjects() {
  const projectIds = await projectsStore.keys()
  const projects = await Promise.all(projectIds.map(async (id) => {
    const project = await projectsStore.getItem(id)
    return project
  }))

  return projects
}

export async function getFilesByProjectId(projectId) {
  if (!projectId) {
    return []
  }

  const fileIds = await filesStore.keys()
  const files = await Promise.all(fileIds.map(async (id) => {
    const file = await filesStore.getItem(id)

    if (file.project_id === projectId) {
      return file
    }

    return null
  }))

  return files.filter((f) => {
    return f !== null
  })
}

export async function createProject() {
  const id = randomId('project_')

  const newProject = await projectsStore.setItem(id, {
    id,
    name: '',
    created_at: Date.now(),
  })

  return newProject
}

export async function createFile(data) {
  const id = data.id || randomId('file_')

  const newFile = await filesStore.setItem(id, {
    id,
    project_id: data.project_id,
    name: data.name || '',
    type: 'html',
    created_at: Date.now(),
    last_modified: Date.now(),
    content: data.is_default ? config.defaults.file.content() : '',
  })

  return newFile
}

export async function saveFile(id, data) {
  const file = await filesStore.getItem(id)

  if (!file) {
    console.warn(`file ${id} not found`)
    return
  }

  if (data.content) {
    file.content = data.content
  }

  if (data.name) {
    file.name = data.name
  }

  file.last_modified = Date.now()

  await filesStore.setItem(id, file)
}

export async function clearFile(id) {
  await filesStore.removeItem(id)
  const file = await filesStore.getItem(id)

  if (!file) {
    return
  }

  file.content = config.defaults.file.content()

  await filesStore.setItem(id, file)

  return file
}
