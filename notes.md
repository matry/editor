## Philosophy

Stride aims to answer the following question: what is the fastest possible website-building experience?
In order to do this, the user needs...

1. Everything at their fingertips. This includes fonts, image assets, video assets, placeholder copy, templates, components, themes, colors, typography scales, and anything else.
2. They should be able to design either a full page, or a single component.
3. They should be able to import pages/components they already created.
4. They should be able to export however they wish: raw css, static html/css, react, vue, svelte, angular, or direct hosting from the editor.

## Design Constraints

- There should be a clear separation between the canvas (what the user creates), and the application
- Any application UI should not pollute the global CSS scope
- The rendering and function of the canvas should not depend on the application
- The user should always have some visual indication of the state of the editor
- The editing canvas should be a direct child of the `<body />`, not nested inside any application UI
- Application feedback should be given through standard web conventions such as Alert(), Prompt() and Confirm()
- The application should strive not to overwrite default browser shortcuts such as reload, back, search, etc.

## Element Types

Stride's philosophy is that our editor is primarily a design tool.
As such, we separate design considerations from semantic/accessibility considerations.
While creating a web page, we believe it's best to start by focusing on the visual result.
Our element types reflect that perspective, so when creating elements, there are only a subset of available types:

1. Group (`<div />`)
2. Text (`<span />`)
3. Image (`<img />`)
4. Video (`<video />`)
5. Form elements

## Element States

Stride aims to add as little application UI as possible.
But some is required in order to inform the user about the current state of the editor.
An example is element state.
Elements can be presented in the following states:

1. Deselected (default)
2. Highlighted (the element is matched by a search)
3. Selected (the element is currently focused by the user, and is affected by editing actions taken by the user)
4. Grabbed (the element is slated for a positional move)
5. Edited (the element is currently being edited)

## Select Mode

Select mode is the default mode, and allows the user to add and remove content to and from the DOM.

### select

Selection adds focus to a particular element.
Focused elements can be edited, inspected, or deleted.
In addition to "selection", there's also the concept of scope.
Scope is defined by the parent of the current selection.
When no element is selected, the scope is the entire page.

Stride also distinguishes between "contentful" elements and otherwise.
An element is "contentful" if content (whether text, image, video, or form input) is directly nested inside of the element.

- select element: `click` or `down_arrow`
- add new element to selection: `shift + click`
- remove selected element from selection: `shift + click`
- select all elements in scope: `cmd + a`
- select all contentful elements in scope: `cmd + alt + a`
- select all proceeding elements in scope: `cmd + shift + down_arrow`
- select all proceeding contentful elements in scope: `cmd + alt + shift + down_arrow`
- select all preceeding elements in scope: `cmd + shift + up_arrow`
- select all preceeding contentful elements in scope: `cmd + alt + shift + up_arrow`
- select previous sibling element in scope: `up_arrow`
- select previous sibling contentful element in scope: `alt + up_arrow`
- select next sibling element in scope: `down_arrow`
- select next sibling contentful element in scope: `alt + down_arrow`
- add previous sibling element in scope to selection: `shift + up_arrow`
- add previous sibling contentful element in scope to selection: `shift + alt + up_arrow`
- add next sibling element in scope to selection: `shift + down_arrow`
- add next sibling contentful element in scope to selection: `shift + alt + down_arrow`
- select last sibling element in scope: `cmd + down_arrow`
- select last sibling contentful element in scope: `cmd + alt + down_arrow`
- select first sibling element in scope: `cmd + up_arrow`
- select first sibling contentful element in scope: `cmd + alt + up_arrow`
- select first child: `right_arrow`
- select parent: `left_arrow`
- select root: `escape`

### create

Creating an element appends it to the DOM of the current page.
Not all creation methods are listed here - other actions, such as group or duplicate, may result in the creation of new elements.

- append element as next sibling: `>`
- append element as the first child inside the selected element
- append element as the last child inside the selected element
  <!-- - create element of specific type -->
  <!-- - append element as previous sibling -->
  <!-- - append element as last sibling -->
  <!-- - append element as first sibling -->

### duplicate

Elements can be duplicated.

- duplicate as next sibling: `d`
- copy element(s): `cmd + c`
- cut element(s): `cmd + x`
- paste as next sibling: `cmd + v`
- paste as last child: `cmd + v + right_arrow`
  <!-- - duplicate as previous sibling -->
  <!-- - duplicate as last sibling -->
  <!-- - duplicate as first sibling -->
  <!-- - duplicate as last child -->
  <!-- - duplicate as first child -->
  <!-- - paste as previous sibling -->
  <!-- - paste as last sibling -->
  <!-- - paste as first sibling -->
  <!-- - paste as first child -->

### delete

Deleting an element removes it from the DOM of the current page.

- delete selected element(s): `delete`

### move

Move an element from one location in the DOM to another.
A "move" is usually split into two actions: (1) a grab, then (2) a drop.
In certain scenarios, these two actions can be combined for efficiency.

- move element(s) ahead of next sibling: `alt + down_arrow`
- move element(s) behind previous sibling: `alt + up_arrow`
- grab element(s): `shift + m`
- drop element(s) as next sibling: `shift + d`
  <!-- - drop element(s) as previous sibling -->
  <!-- - drop element(s) as last sibling -->
  <!-- - drop element(s) as first sibling -->
  <!-- - drop element(s) as last child -->
  <!-- - drop element(s) as first child -->

### group

Grouping elements will take the current selection, and append a wrapping div around them.

- group selected elements and append at first selected position: `shift + g`
  <!-- - group selected elements and append at last selected position -->
  <!-- - group selected elements and perform a grab -->

### search

Searching an element will highlight the matched elements on the current page.
Eventually, elements will be able to be searched across all pages within a project.

- search elements by name
- search elements by text content
- select all matched elements
- tab through selection of matched elements

## Edit Mode

tbd

## Element Structure

### shape

- command: shift + s
- div

### text

- command: shift + t
- span

### image

- command: shift + i
- img

### video

- command: shift + v
- video

### native element

- command: shift + /
- [user input]
