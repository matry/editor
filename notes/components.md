
what is a component? what is its purpose?

a component is an intervention.

without intervention, a designed UI will be a single, self-contained artifact.
with intervention, the UI will be split into multiple groups that we call components.
the usual reason given is that it allows designers and developers to reuse that bit of UI in different places in the project.

but what does that mean _specifically_?

it means that if I'm designing a bit of UI, and it's a bit of UI that has already been created, then I won't need to go through the motions of creating it all over again. I can just tell the editor to use _that other piece of UI that I already created_.

it also means that if I need to update a bit of UI, then the same principles apply.
instead of updating each bit of UI, one by one, we can simply make our changes in one place and the change will propagate.

in design tools this usually means there's an original, master copy of the UI.
the other descendent copies inherit properties from the original, but can also override properties, and can also "detach" from the master.

in developer tools this usually means there's a prototype of the UI, which isn't by itself reflected in the final product.
each actual bit of the UI is instead an _instance_ of that prototype.

these are two component models that satisfy the basic condition that designers and developers don't want to repeat themselves.
but is there another model?

ultimately we're talking about copies of three things:
1. element structure
2. media content (text/image/video/etc)
3. styles

I see a few features that, if combined, could reduce the need for complex component manipulation.

- names and labels. these let us identify a kind of structure throughout the document and can be used for selection and group manipulation
- intelligent copying - the ability to copy the structure or the content or the styles. OR a subset of the styles.
- intelligent pasting (i.e. merging) - the ability to merge in styles seamlessly, rather than overwriting entirely.

types of style merges:
- replace all style properties regardless
- only add the style properties that weren't already defined
- only replace the style properties that were already defined, don't add new properties
