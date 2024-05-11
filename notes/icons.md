
icons are such a common use case for app development that it makes sense to have specialized,
built-in functionality to support it.
what should the extension look like?

a user should be able to...
- easily remember what command to use to search for icons
- browse icon families
- browse icons within a family
- browse icons across all families
- search for families
- search for icons within a family
- search for icons across all families

while all these are useful, we could probably deploy with a subset of features:
- browse icons across all families
- search for icons across all families

how should the remote store be conceived of?

1. we have a dedicated server for asset handling, which we hide behind a paywall
2. we have a package registry which handles assets, and our built-in assets are really just our standard library

the latter means that our engineering effort gives us the biggest bang for the buck
