---
title: "I rebuilt this website with AI and it is still good enough"
pubDate: 2026-07-11
description: "The old site was built with ChatGPT in 2023. The new one was built with Claude and Cursor. Here is what changed, what broke, and what I learned."
---

You are looking at the new version of this website. If you never saw the old one, congratulations. If you did, you know why I rebuilt it.

Here is what the old homepage looked like. A welcome message, a link, and a lot of empty space. It did the job.

![The old homepage: a welcome message and one link](/assets/blog/old-site-home.png)

## The old site

The first post on this blog is called "Creating a blog with ChatGPT". That was April 2023. ChatGPT gave me some HTML, I pasted it into GitHub, and I had a website. It worked. I was proud of it.

But here is what writing a blog post looked like on that site:

1. Copy an old post file
2. Rename it to post13.html
3. Edit the title, the date, the text, and try not to break the header
4. Open blog.html and add a link to the new post by hand
5. Push it and hope

Step 4 is where blog posts go to die. I wrote 12 posts in two years. The friction was not the only reason, but it did not help.

![The old blog: a plain list of blue links](/assets/blog/old-site-blog.png)

## The new setup

This time I used two AI tools instead of one.

**Claude** was the architect and designer. We talked about what the site should be, it looked at my old site, wrote a full plan with phases, picked the colors and fonts, and told me what to paste into Cursor. When something looked wrong, I sent a screenshot and got a fix.

**Cursor** was the builder. I pasted the plan, one phase at a time, and it wrote the code, ran the commands, and moved the old content over.

My job was to click "Run", look at the result, and complain. I am very good at my job.

## What actually changed

The site now runs on Astro. I did not know what Astro was two weeks ago. The short version: writing a new blog post is now one file. I write some text, save it, push it, and a robot builds the site and publishes it. No copying HTML. No editing a list of links by hand. I can even do it from my phone.

Also new:

- **Night mode.** Click the moon in the header. This is my favorite useless favorite feature.
- **It works on mobile.** The old one sort of did. This one actually does.
- **The slider on the homepage.** Drag it and decide for yourself how impressive I am. I wrote all the versions myself and only one of them is true.

And one thing is gone: the AI portrait of me in a space suit that lived in the corner of every page. It had a good run.

![The old about page, featuring space suit me](/assets/blog/old-site-about.png)

## What I learned

AI did not build this website alone. It built it while I watched, and the watching turned out to be the important part.

Cursor told me twice that everything worked when it did not. The blog posts were "fine" while my own screen showed no blog posts. The lesson: when the AI says it works and your eyes say it does not, your eyes win. Ask for proof, not reassurance.

I also learned git the hard way, by editing a file by hand, regretting it, and discovering that one command could undo my mistake. Commit before you experiment. I will forget this and relearn it many times.

## Is it perfect?

No. The homepage is a bit crowded. Some things I already want to change. There is a list.

But the old site taught me this: perfect is not the goal. The goal is that it exists, that I can change it without fear, and that writing the next post takes minutes instead of an evening.

So yeah. New website. Built with AI, supervised by a human with strong opinions and weak technical skills.

Still good enough. Now with less friction.
