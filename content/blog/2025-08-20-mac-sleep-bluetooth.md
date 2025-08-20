+++
title="Disabling bluetooth on a sleeping Mac, or: \"Why the fuck is this not a setting, Apple? - Part 73\""
+++

Here's another addition to my ever-growing collection of "things that should be simple but require scripting because Apple knows better than you." Bluetooth staying on when my Mac goes to sleep.

## The Problem

Often I use my wireless headphones around the house while doing chores, and when walking the dog around the block. And it is *super annoying* when I go in and out of bluetooth range of my macbook and the earphones anounce "Disconnected!" and "Connected!" reapeatedly. When my macbook is in sleep mode I obviously do not want to connect my earphones to it!

## What Should Exist But Doesn't

You'd think there would be a checkbox somewhere in System Preferences (sorry, "System Settings" now, because we needed another UI overhaul) that says "Turn off Bluetooth when computer sleeps." Makes sense, right?

But no, Apple decided this isn't something users should control. Because obviously Apple's engineers know better than you whether you want your peripheral devices staying connected to a sleeping computer. The hubris is honestly impressive. I googled around, and found a [working solution](https://superuser.com/questions/1819753/macos-how-to-disable-bluetooth-while-the-computer-is-asleep-lid-is-closed), but I feel I should not have had to.

## The Solution

Time to script our way around their design decisions. Enter `sleepwatcher` and `blueutil` - two third-party tools that do what macOS should do natively.

First, install the tools:

```bash
brew install sleepwatcher blueutil
```

Then create two simple scripts. One to disable Bluetooth when the Mac goes to sleep:


```bash
#!/bin/bash
/opt/homebrew/bin/blueutil --power off
echo "$(date -Iseconds) -- Sleep event detected, bluetooth disabled. Bluetooth status: $(/opt/homebrew/bin/blueutil --power)" >> ~/.sleepwatcher.log
```

And another to re-enable it when waking up:

```bash
#!/bin/bash
/opt/homebrew/bin/blueutil --power on
echo "$(date -Iseconds) -- Wake event detected, bluetooth enabled. Bluetooth status: $(/opt/homebrew/bin/blueutil --power)" >> ~/.sleepwatcher.log
```

Save these as `~/.sleep` and `~/.wakeup` respectively, make them executable with `chmod 700`, and configure sleepwatcher to run them automatically.

`brew services start sleepwatcher`

## Apple, bruh

This is just another example of Apple's philosophy that they know what's best for you. Sometimes they are right, and their default settings often work well for most people. But when they're wrong, they really don't want you to be able to fix it.

The irony is that macOS is supposedly the "pro" operating system, built for people who supposedly know what they're doing. Yet basic power management options are hidden behind the need for third-party tools and shell scripting.

If you're dealing with the same Bluetooth annoyance, the scripts above should sort you out. And if you happen to work at Apple: please, just add the checkbox. We promise we won't hurt ourselves with it.
