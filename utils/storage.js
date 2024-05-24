import localforage from 'localforage'
import { randomId } from '../controller/utils'

export const projectsStore = localforage.createInstance({
  name: 'projects',
})

export const filesStore = localforage.createInstance({
  name: 'files',
})

export async function initDirectory() {
  const projects = await initProjects()
  const files = await initFiles(projects[0].id)

  return {
    projects,
    files,
    activeProject: projects[0],
    activeFile: files[0],
  }
}

export async function initProjects() {
  const projectIds = await projectsStore.keys()
  const projects = await Promise.all(projectIds.map(async (id) => {
    const project = await projectsStore.getItem(id)
    return project
  }))

  if (projects.length) {
    return projects
  }

  const defaultProject = await createProject({
    id: 'default',
    name: 'Default Project',
  })
  projects.push(defaultProject)

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

  const defaultFile = await createFile({
    id: 'default',
    project_id: defaultProjectId,
    name: 'Default File',
    rootAttributes: {},
    bodyAttributes: {},
    content: `
      <span
        data-type="text"
        id="placeholder-content"
        data-styles='{"base":{}}'
      >
        Welcome to Stride, a keyboard-driven tool for designing in the browser. Press 'h' for help.
      </span>
    `,
  })
  files.push(defaultFile)

  return files
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
    rootAttributes: data.rootAttributes || {},
    bodyAttributes: data.bodyAttributes || {},
    content: '',
  })

  return newFile
}

export async function saveFile(id, content, rootAttributes, bodyAttributes) {
  const file = await filesStore.getItem(id)

  if (!file) {
    console.warn(`file ${id} not found`)
    return
  }

  file.content = content
  file.rootAttributes = rootAttributes || {}
  file.bodyAttributes = bodyAttributes || {}

  await filesStore.setItem(id, file)
}

export async function clearFile(id) {
  const file = await filesStore.getItem(id)

  if (!file) {
    return
  }

  file.rootAttributes = {}
  file.content = `
    <span
      data-type="text"
      id="placeholder-content"
      data-styles='{"base":{}}'
    >
      Welcome to Stride, a keyboard-driven tool for designing in the browser. Press 'h' for help.
    </span>
  `

  await filesStore.setItem(id, file)
}
