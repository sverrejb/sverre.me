+++
title="Mirroring your Android display to Mac or Linux"
+++

(This is an old post originally posted on our company Medium blog, which is now gone. I transplanted it here for posterity.)

For a presentation I needed to show the audience what was going on on my Android phone. I expected this to be easy, but I ended up spending more than enough time figuring it out.

My first idea was to connect my phone to the projector using a USB-C to HDMI adapter. After testing with two different adapters, trawling the phone settings, and finally finding that [this (now deleted) wikipedia article did not list my phone,](https://en.wikipedia.org/wiki/List_of_devices_with_video_output_over_USB-C#Smartphones) I realized that direct video output was not an option.

My next attempt was to find an app that would let me accomplish my goal. Several alternatives exists, such as [Vysor](https://www.vysor.io/), [AirDroid](https://www.airdroid.com/) and [Droid@Screen](http://droid-at-screen.org/) among others. Vysor is capped at a low bandwidth unless you pay for the premium features, resulting in a low-resolution image. It also required installing an app on both my phone and computer. AirDroid was cumbersome to use, required me to register an account and also delivered sub-par resolution. Droid@Screen I could not even get to work on my Mac. Back to the googling board, then.

Hidden in [an answer on the Android Stackexchange](https://android.stackexchange.com/a/154328/278658), with ten measly upvotes, I finally found my solution. It came in the most pleasing of forms, a simple combination of command line tools that can be run on your mac on linux laptop. It relies on Android Debug Bridge (adb), a tool that lets you interact with your phone using the terminal.

`adb shell screenrecord --output-format=h264 — | ffplay -framerate 60 -probesize 32 -sync video -\`

![](https://cdn-images-1.medium.com/max/800/1*nNpym802m5b1SOIlDob-uQ.gif)

It’s working!

This solved my problem in a simple and developer-friendly way. It also did not force me to install any additional software, as I had installed both Android Debug Bridge and ffmpeg previously. Awesome!

If adb is not installed, it can be done with `brew cask install android-platform-tools` on Mac or with your package manager of choice on Linux.

So what does this command do? Let’s break it down a bit:

`adb shell screenrecord` starts the screenrecord application on the phone. Screenrecord has been available on Android since 4.4, and does, as the name implies, record whatever is on the screen. `--output-format=h264` spcecifies the output format, and the final hyphen sets the output of screenrecord to stdout.

`| ffplay` pipes the output from screenrecord to ffplay on the computer. ffplay is a simple media player that comes with ffmpeg. `-framerate 60 -probesize 32` specifies the frame rate and probesize. 32 is the lowest setting for probe size, and minimizes the delay in the playback.`-sync video` drops frames instead of fast-forwarding them, and the last hyphen sets the video input to stdin.

This solution does come with some caveats:  


* You need to connect to your phone with a USB-cable (adb does support connecting over wifi, but I have not tested it for video transfer)
* `screenrecord` has a time limit of three minutes, unless you want to [recompile from source](https://stackoverflow.com/questions/21938948/how-to-increase-time-limit-of-adb-screen-record-of-android-kitkat/25834761#25834761). Alternatively, you can put screenrecord in a while loop, like so: `adb shell "while true; do screenrecord --output-format=h264 -; done" | ffplay -framerate 60 -probesize 32 -sync video -`

