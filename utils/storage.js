import localforage from 'localforage'
import { randomId } from '../controller/utils'

export const projectsStore = localforage.createInstance({
  name: 'projects',
})

export const filesStore = localforage.createInstance({
  name: 'files',
})

export async function initProjects() {
  const projectIds = await projectsStore.keys()
  const projects = await Promise.all(projectIds.map(async (id) => {
    const project = await projectsStore.getItem(id)
    return project
  }))

  if (projects.length) {
    return projects
  }

  projects.push(
    await createProject({
      id: 'default',
      name: 'Default Project',
    })
  )

  return projects
}

export async function initFiles(defaultProjectId = '') {
  const fileIds = await filesStore.keys()
  const files = await Promise.all(fileIds.map(async (id) => {
    const file = await filesStore.getItem(id)
    return file
  }))

  if (files.length) {
    return files
  }

  files.push(
    await createFile({
      id: 'default',
      project_id: defaultProjectId,
      name: 'Default File',
    })
  )

  return files
}

export async function initDirectory() {
  const projects = await initProjects()
  const files = await initFiles(projects[0].id)

  return {
    projects,
    files,
  }
}

export async function createProject(data) {
  const id = data.id || randomId('project_')

  const newProject = await projectsStore.setItem(id, {
    id,
    name: data.name || id,
    created_at: Date.now(),
  })

  return newProject
}

export async function createFile(data) {
  const id = data.id || randomId('file_')

  const newFile = await filesStore.setItem(id, {
    id,
    project_id: data.project_id,
    name: data.name || id,
    type: 'html',
    created_at: Date.now(),
    data: '',
  })

  return newFile
}
