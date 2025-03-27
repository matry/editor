![the logo for matry, the letter M in a bright aqua gradient](https://github.com/matry/editor/blob/main/public/favicon.svg?raw=true)

## Matry

Matry can most easily be described as "vim for design."
It's a keyboard-driven UI/UX tool that is geared toward design engineers,
and takes inspiration from several ideas I developed while working on Matry as [a programming language](https://github.com/matry/tree-sitter-matry).

## Design Principles

Matry is governed by a few key principles:

1. **Efficiency begets power**. The raison d'etre of a professional tool should be to empower you, and most of the time that means _getting out of your way_.
2. **Power over familiarity**. Professional tools shouldn't be afraid to depart dramatically from long-standing conventions, if doing so empowers their users.
3. **Design should be performed in the target medium**. If you're designing for the web, then the browser should be your working environment.
4. **Drawing tools are not equipped to solve modern design problems**. At scale, designing a product often means creating a system, and text is better suited for that purpose than graphical illustrations.
5. **Designers and developers should collaborate on the same artifact**. In the game industry, artists and developers actively collaborate together on the final product, yet for web and mobile app development, this has never been the case. Why shouldn't it be?
6. **Design tools should be framework-agnostic**. Lots of new design tools output to React, but the only realistic future is one where a design tool can output to any target. Matry compiles your work into an [intermediate representation](https://en.wikipedia.org/wiki/Intermediate_representation), which can then be transpiled into any format you wish.

## Overview

Matry uses a mnemonic keyboard command system that is somewhat Vim-like in its attempt to feel like natural language.
For example, in the same way that Vim's `d w` command means "delete word", Matry has the command `a s`, which means "add shape."
And in the same way you can think of Vim Motions as a DSL for text editing, you can also think of Matry as a command language for UI editing.

[Below](#command-reference) is an incomplete list of currently available commands.
Many more will be added in the future.

## Roadmap

Currently, Matry only exists as a prototype.
In the fully fleshed out version, the plan is to build:

- Workspace/project/file system structure
- Collaborative editing
- Search menu for fonts, icons, images, etc
- Asset management
- Components
- Built-in package registry
- Plugin ecosystem
- CI/CD integration
- A lot more...

## Command Reference

| command | description                           |
| ------- | ------------------------------------- |
| `↑`     | select previous sibling               |
| `↓`     | select next sibling                   |
| `→`     | select first child                    |
| `←`     | select parent                         |
| `⌘ + s` | save file                             |
| `⌘ + e` | export file                           |
| `⌘ + ⌫` | clear file                            |
| `h`     | open help menu                        |
| `t b`   | toggle box model overlay              |
| `⌫`     | delete element                        |
| `a s ↑` | add shape element as previous sibling |
| `a s ↓` | add shape element as next sibling     |
| `a s →` | add shape element as first child      |
| `a s ←` | add shape element as parent           |
| `a t ↑` | add text element as previous sibling  |
| `a t ↓` | add text element as next sibling      |
| `a t →` | add text element as first child       |
| `a i ↑` | add image element as previous sibling |
| `a i ↓` | add image element as next sibling     |
| `a i →` | add image element as first child      |
| `e s`   | edit styles                           |
| `e t`   | edit text content                     |
| `e i`   | edit image content                    |
| `⇧ + ↑` | expand selection to previous sibling  |
| `⇧ + ↓` | expand selection to next sibling      |
| `⌘ + ↑` | select first sibling                  |
| `⌘ + ↓` | select last sibling                   |
| `⌘ + a` | select all siblings                   |
