
"variables" are essentially any external data that can affect the output of the artifact.
this can include, but is not limited to, css variables.
other "variables" include built-in data such as dark-mode/light-mode, screen size, etc.
finally, i intend to support user-defined variables that can be used to generate artifacts with different visual parameters.

there's a final set of "variables" that aren't really variables, but is really the aggregation of all styles and style values.

ideally a user would be able to...
- view all unique styles (key/value pairs) for a single file or entire project, along with the number of instances for each one
- view all unique style values for a single file or entire project, along with the number of instances for each one
- edit either styles or style values and reflect the change across all instances

- view all css variables for a single file or entire project
- update a css variable for a single file or entire project
