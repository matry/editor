## Matry

Matry is a design tool for designing in the browser.
But it's more than that.
At it's heart is a command language for creating interfaces.
This language enables the user to invoke commands through carefully crafted keyboard shortcuts.

Similar in philosophy to Vim, this language is designed to let the user create at the speed of their own thoughts.
This is not something that designers are familiar with - all design tools currently require lots of manual manipulation.
Whether it's directly editing a canvas using art-inspired tools like a pen or paintbrush,
or selecting an item from within a dropdown from within a settings menu from within a sidebar,
the user is constantly shifting back and forth between making a decision,
and figuring out how to execute that decision.

This command language is intended to give them a complete sense of control.
But it comes at a cost - the cost of learning the tool.
As design tools are made for designers,
they trend towards flashier design that's more visually impressive,
in an attempt to win designers over with first impressions.

Matry goes in the complete opposite direction.

It requires dedication and discipline to be able to use Matry effectively.
But at the end of that learning curve is a powerhouse unlike anything that's come before it.

Though the first instance of Matry is in the browser,
it is in fact platform agnostic.
There's no reason why you couldn't have a similar version for other platforms such as iOS, Android, etc.

While Matry aims to be as flexible as possible, there are some rules it uses to constrain complexity.

1. There are no selectors. Styles must be applied to elements directly.
2. A style property can only be defined once. While we cannot block the cascade, we do block the ability to arbitrarily re-declare styles for elements.
3. Instead of using classes or selectors for dynamic rendering, it uses dedicated boolean logic to parameterize element styles.
4. It is strongly opinionated on the divide between designers and developers. Designers focus on presentational logic. Developers focus on functional behavior. This means that the tool is intended to mimic game development, in the sense that designers hand over static artifacts to developers, who then bring them to life with scripted behavior.

## said differently

Matry is a textual interface for design engineers.
It intends to sit between design and development, providing a robust toolset that empowers those who can perform in both domains.

By targeting this unique group of professionals, the tool stands to help bridge the gap between design and development.

It intends to sharpen the OODA loop by whittling down bits of "micro toil" that exist in the creative process.

## modes

- normal
- edit

## select mode

Select mode is the default mode when editing a document.
It allows users to traverse the dom and add/edit/delete elements.
From this mode, users can enter any other mode.

- escape (exit focus)
- up (select previous sibling)
- down (select next sibling)
- right (select first child)
- left (select parent)
- shift + up (add previous sibling to selection)
- shift + down (add next sibling to selection)
- shift + a (add all siblings to selection)
- cmd + s (save)
- cmd + up (select first sibling)
- cmd + down (select last sibling)
- cmd + left (select outermost parent)
- cmd + right (select first leaf)
- enter (enter content mode)
- / (enter style mode)

#### a (append sequence)

1. element

   - s (shape)
   - i (image)
   - t (text)
   - f (iframe)

2. direction

   - up (append as previous sibling)
   - down (append as next sibling)
   - right (append as first child)
   - left (append as parent of current selection(s))

## content mode

Content mode allows users to alter the content embedded within certain elements.
It's worth pointing out that not all elements are allowed to have content.
At the time of this writing, the "contentful" elements are text and image.

- When editing the content for a text element, the editor sidebar becomes a rich text editor.
- When editing the content for an image element, the editor displays options for (a) selecting existing assets, (b) loading a new image from your computer or from a url, and (c) generating a placeholder image with AI.

## style mode

When in this mode, the user-defined styles of the selection is provided.
If there are multiple selections, only styles applied to all selections are shown.
The editor displays this list, as well as input for adding a new style declaration.

The style declaration consists of two inputs, one for the property and another for the value.
Typing into the property input brings up an auto-complete menu for pre-existing style combinators.
These combinators are commands that mimic Tailwind classes.
For instance, `flex` resolves to `display: flex`.
Selecting one of these options will append that style to the list of declared styles.
If a combinator is used, the editor will remember that choice and will appropriately update the element if the upstream configuration changes.

A powerful feature of combinators is the use of pseudo commands.
This concept mixes pseudo classes, pseudo selectors, and even certain common descendent selectors.

For example...

1. `:lg` generates a large media query selector
2. `:hover` generates a hover pseudo selector
3. `:before` uses the before pseudo class
4. `:b` generates a selector for all bold elements within the selected text element (only for text elements, used for rich text)
5. `:even` generates a selector for all even children within an iterable element (only for iterables such as `li` and `tr`)

## commands

resize sidebar
open/close sidebar
toggle zoom
zoom in
zoom out
reset zoom
toggle box model overlay
switch to outline mode

## editor hierarchy

account view

- list workspaces
  workspace view
- list projects
  project view
- list files
  file view
- list elements
