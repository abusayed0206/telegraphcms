# 📜 Telegraph CMS

Use Telegram's Telegraph platform as a CMS/blogging tool for your site! 🚀

## 🛠 Tech Stack

- ⚛️ **Next.js**
- 💬 **Telegram** [![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?logo=telegram&logoColor=white)](https://telegram.org)

## ⚙️ Setup

1. **Login via Telegraph Bot** 🤖  
   - Open Telegram and chat with the Telegraph bot.
   - Click on "Login as [your username]" to authorize.  
   - This will open a browser, and you’ll be successfully logged in!

2. **Get Your Token** 🛡️  
   - Open your browser’s DevTools:  
     - `Inspect > Network > XHR (refresh)`
   - Locate the `cookie` header and find your `tpf_token`.

3. **Add Token to Hosting** 🔑  
   - Go to your static hosting platform (Vercel, Netlify, or Cloudflare Pages).  
   - Add `TPF_TOKEN` as an environment variable with the value of your token.

![ApplicationFrameHost_PJyY7c9dqw](https://github.com/user-attachments/assets/c2698750-659e-42c8-91c0-948920958691)


## 🚀 Deploy

You can deploy to any static site hosting platform (e.g., Vercel, Netlify, CF Pages) with ease!

---

## 🗒 Backlog

- ✅ **Check and verify all HTML tags**  
  - Ensure that all HTML tags from the Telegraph API are parsed and rendered correctly on your site.

---

## 📝 To Do

- 📍 **Sitemap Generation**  
  - Implement **sitemap generation** at build time using **next-sitemap** or another method to dynamically generate a sitemap for improved SEO.

---
