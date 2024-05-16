
![the logo for stride, an S surrounded by a pink rounded rectangle](https://github.com/danielvaughn/stride-editor/blob/main/public/stride_logo.svg?raw=true)

## Stride

The Stride Editor is a side project that I'm currently working on,
which takes inspiration from several ideas I've developed while working on Matry.
At its heart, it can be described as "vim for UI designers."
It's a keyboard-driven UI design tool that is intended to bridge the gap between designers and developers.

You can [view a demo here](https://stride-editor.vercel.app). WARNING - this tool is actively being developed, meaning you should expect bugs and breaking changes.

## Design Principles

Stride is governed by a few key principles:

1. **Efficiency begets power**. The primary motto of a professional tool should be to empower you, and most of the time that means *getting out of your way*.
2. **Power over familiarity**. Professional tools shouldn't be afraid to depart dramatically from long-standing conventions, if doing so empowers their users.
3. **Design should be performed in the target medium**. If you're designing for the web, then the browser should be your working environment.
4. **Drawing tools are not equipped to solve modern design problems**. At scale, designing a product often means creating a system, and text is better suited for that purpose than graphical illustrations.
5. **Designers and developers should collaborate on the same artifact**. In the game industry, artists and developers actively collaborate together on the final product, yet for web and mobile app development, this has never been the case. Why shouldn't it be?

## Overview

Stride uses a mnemonic keyboard command system that is somewhat Vim-like in its attempt to feel like natural language.
For example, in the same way that Vim's `d w` command means "delete word", Stride has the command `a s`, which means "add shape."
And in the same way you can think of Vim Motions as a DSL for text editing, you can also think of Stride as a command language for UI editing.

[Below](#command-reference) is a full (yet poorly organized) list of currently available commands.
Many more will be added in the future.

## Roadmap

Currently, Stride only exists as a prototype.
In the fully fleshed out version, the plan is to build:

* Workspace/project/file system structure
* Collaborative editing
* Search menu for fonts, icons, images, etc
* Asset management
* Components
* Built-in package registry
* Plugin ecosystem
* CI/CD integration
* A lot more...

## Command Reference

| command | description |
| --- | --- |
| `↑` | select previous sibling |
| `↓` | select next sibling |
| `→` | select first child |
| `←` | select parent |
| `⌘ + s` | save file |
| `⌘ + e` | export file |
| `⌘ + ⌫` | clear file |
| `h` | open help menu |
| `t b` | toggle box model overlay |
| `⌫` | delete element |
| `a s ↑` | add shape element as previous sibling |
| `a s ↓` | add shape element as next sibling |
| `a s →` | add shape element as first child |
| `a s ←` | add shape element as parent |
| `a t ↑` | add text element as previous sibling |
| `a t ↓` | add text element as next sibling |
| `a t →` | add text element as first child |
| `a i ↑` | add image element as previous sibling |
| `a i ↓` | add image element as next sibling |
| `a i →` | add image element as first child |
| `e s` | edit styles |
| `e t` | edit text content |
| `e i` | edit image content |
| `⇧ + ↑` | expand selection to previous sibling |
| `⇧ + ↓` | expand selection to next sibling |
| `⌘ + ↑` | select first sibling |
| `⌘ + ↓` | select last sibling |
| `⌘ + a` | select all siblings |
