"use client";
import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Link from "next/link";

interface ContentItem {
  tag: string;
  attrs?: Record<string, string>;
  children: (string | ContentItem)[];
}

interface PostData {
  title: string;
  content: ContentItem[];
  description?: string;
  author_name?: string;
  author_url?: string;
  views?: number;
}

function addBaseUrl(url: string): string {
  const baseURL = "https://telegra.ph";
  return url.startsWith("/") ? `${baseURL}${url}` : url;
}

function renderContent(item: ContentItem): JSX.Element {
  const { tag, attrs = {}, children = [] } = item;

  if ((tag === "img" || tag === "iframe") && attrs.src) {
    attrs.src = addBaseUrl(attrs.src);
  }

  const sanitizedAttrs = Object.entries(attrs).reduce((acc, [key, value]) => {
    acc[key] = DOMPurify.sanitize(value);
    return acc;
  }, {} as Record<string, string>);

  const sanitizedChildren = children.map((child) =>
    typeof child === "string" ? DOMPurify.sanitize(child) : renderContent(child)
  );

  let className = "my-4 text-black"; // Text color updated to black
  switch (tag) {
    case "img":
      className += " rounded-lg max-w-full mx-auto cursor-pointer";
      break;
    case "iframe":
      className += " rounded-lg max-w-full mx-auto aspect-video w-full";
      break;
    case "a":
      className += " underline text-blue-500 hover:text-blue-400"; // Link color updated
      break;
    case "p":
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
      className += " text-center";
      break;
    case "blockquote":
      className += " border-l-4 border-gray-400 pl-4 italic my-8"; // Border color updated
      break;
  }

  if (tag === "img") {
    return (
      <img
        src={sanitizedAttrs.src || ""}
        alt={sanitizedAttrs.alt || ""}
        width={500}
        height={300}
        className={className}
        onClick={() => {
          const modal = document.createElement("div");
          modal.style.position = "fixed";
          modal.style.top = "0";
          modal.style.left = "0";
          modal.style.width = "100%";
          modal.style.height = "100%";
          modal.style.backgroundColor = "rgba(0,0,0,0.8)";
          modal.style.display = "flex";
          modal.style.justifyContent = "center";
          modal.style.alignItems = "center";
          modal.style.zIndex = "1000";

          const img = document.createElement("img");
          img.src = sanitizedAttrs.src || "";
          img.alt = sanitizedAttrs.alt || "";
          img.style.maxWidth = "90%";
          img.style.maxHeight = "90%";
          img.style.borderRadius = "0.5rem";
          img.style.border = "none";

          modal.appendChild(img);
          document.body.appendChild(modal);

          modal.onclick = () => {
            document.body.removeChild(modal);
          };
        }}
      />
    );
  }

  if (tag === "iframe" && attrs.src) {
    const srcLower = attrs.src.toLowerCase();
    if (
      srcLower.endsWith(".jpg") ||
      srcLower.endsWith(".png") ||
      srcLower.endsWith(".gif")
    ) {
      return (
        <img
          src={attrs.src}
          alt="Embedded content"
          width={500}
          height={300}
          className={className}
        />
      );
    }
    if (srcLower.endsWith(".mp4") || srcLower.endsWith(".webm")) {
      return <video src={attrs.src} controls className={className} />;
    }
  }

  return React.createElement(
    tag,
    { ...sanitizedAttrs, className },
    ...sanitizedChildren
  );
}

export default function PostContent({
  initialData,
}: {
  initialData: PostData;
}) {
  const [postContent, setPostContent] = useState(initialData);

  useEffect(() => {
    setPostContent(initialData);
  }, [initialData]);

  return (
    <div className="bg-white text-black min-h-screen p-8">
      <div className="flex justify-center mb-6">
        <Link href="/" className="text-black-500 hover:text-blue-400">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
            Home
          </button>
        </Link>
      </div>

      <div className="max-w-screen-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {postContent.title}
        </h1>
        {postContent.author_name && (
          <p className="text-center mb-2">
            <a
              href={postContent.author_url}
              className="underline text-blue-500 hover:text-blue-400"
            >
              {postContent.author_name}
            </a>
          </p>
        )}
        {postContent.views !== undefined && (
          <p className="text-center mb-4">Views: {postContent.views}</p>
        )}
        {postContent.content.map((item, index) => {
          if (item.tag === "figure") {
            return (
              <figure key={index} className="my-8">
                {renderContent(item.children[0] as ContentItem)}
                {item.children[1] && (
                  <figcaption className="text-center mt-2 text-sm italic">
                    {renderContent(item.children[1] as ContentItem)}
                  </figcaption>
                )}
              </figure>
            );
          }
          return (
            <React.Fragment key={index}>{renderContent(item)}</React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
