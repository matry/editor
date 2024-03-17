
The Stride Editor produces artifacts and files.
These artifacts can include many different formats - image, video, font, etc.
But the primary artifacts will be the content itself - the pages/views/components that designers will create.

The question is whether Stride files should be stored in HTML, JSON, or some other format?

## Option 1: HTML

We store the artifact as an HTML file.

Pros:
1. It's the closest representation of the artifact as it's being created in-editor.
2. It matches the direct file formats of the other files in a project.
3. It's highly portable - it can be loaded and rendered directly in any other webpage or website.
4. It could lead to greater *space* performance, since DOM nodes are not represented in the JS heap.

Cons:
1. It's not cross-platform. Stride should ultimately be a cross-platform tool.
2. If the editor uses a virtual DOM, this would create an awkward.
3. It could lead to worse *time* performance, since artifact state must always be inferred from the DOM.
4. It could lead to greater application complexity, since marshalling artifact state into and out of the DOM is tedious.

## Option 2: JSON

We store the artifact as a JSON file.

Pros:
1. We could have a standard file format across platforms. This would make it easier for engineers to build tools that integrate with Stride.
2. It allows for any implementation, because it assumes nothing about how the data is represented in-editor.

Cons:
1. It creates a barrier layer between the artifact and its rendering. This means users cannot render artifacts outside of the application.

## Decision

For now, it makes more sense to store as HTML.
I love the story of "everything we're producing is *just html*".
I also love being able to say that users can render from anywhere.

The idea would be to have an HTML file with a *very* specific schema.
The metadata in the `<head>` would store information about the intended usage of the artifact.
