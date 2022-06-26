## notes

The app will use a command pattern to handle incoming requests to update state.
This is because there are several highly distinct components that each will perform similar actions.

For instance, application state will primarily be updated via window keyboard events.
However, the same actions may (or may not) be taken from events within the application UI.

This means that each action needs to be comprised of the following:

- an action identifier
- a dictionary of parameters that match the action signature

Upon each event trigger, regardless of the source, there must be a method to infer the desired action.
For example, keyboard events will need to inspect the keys pressed.
