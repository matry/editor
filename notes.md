
## stride

Stride is a design tool for designing in the browser.
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

Stride goes in the complete opposite direction.

It requires dedication and discipline to be able to use Stride effectively.
But at the end of that learning curve is a powerhouse unlike anything that's come before it.

Though the first instance of Stride is in the browser,
it is in fact platform agnostic.
There's no reason why you couldn't have a similar version for other platforms such as iOS, Android, etc.

While Stride aims to be as flexible as possible, there are some rules it uses to constrain complexity.

1. There are no selectors. Styles must be applied to elements directly.
2. A style property can only be defined once. While we cannot block the cascade, we do block the ability to arbitrarily re-declare styles for elements.
3. Instead of using classes or selectors for dynamic rendering, it uses dedicated boolean logic to parameterize element styles.
4. It is strongly opinionated on the divide between designers and developers. Designers focus on presentational logic. Developers focus on functional behavior. This means that the tool is intended to mimic game development, in the sense that designers hand over static artifacts to developers, who then bring them to life with scripted behavior.


