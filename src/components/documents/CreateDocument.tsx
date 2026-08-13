import { useEffect, useState } from "react";

declare global {
  interface Window {
    tailwind: any;
  }
}

/**
 * PRIMORDIAL — Create New Document
 * Direct React (TSX) conversion of the original static HTML file.
 * No visual/content changes were made — only HTML -> JSX/TSX syntax
 * conversion (class -> className, self-closing tags, the
 * focus/blur "focused-input" micro-interaction script -> React
 * state). Same Tailwind CDN + config (including this file's own
 * color/spacing/fontFamily/fontSize tokens) + fonts are loaded at
 * runtime so the design renders identically to the source file.
 */

function useFocusClass() {
  const [focused, setFocused] = useState(false);
  return {
    focused,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
}

export default function PrimordialCreateDocument() {
  const nameField = useFocusClass();
  const typeField = useFocusClass();
  const statusField = useFocusClass();
  const descField = useFocusClass();
  const radio1Field = useFocusClass();
  const radio2Field = useFocusClass();

  useEffect(() => {
    // Google Fonts (same as original <head>)
    const fontLink1 = document.createElement("link");
    fontLink1.rel = "stylesheet";
    fontLink1.href =
      "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap";
    document.head.appendChild(fontLink1);

    const fontLink2 = document.createElement("link");
    fontLink2.rel = "stylesheet";
    fontLink2.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";
    document.head.appendChild(fontLink2);

    // Tailwind CDN (same as original)
    const twScript = document.createElement("script");
    twScript.src = "https://cdn.tailwindcss.com?plugins=forms,container-queries";
    twScript.onload = () => {
      window.tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "on-surface": "#1b1c19",
              "on-tertiary-fixed": "#2a170e",
              "inverse-surface": "#30312e",
              "on-primary-fixed": "#351000",
              "surface-bright": "#fbf9f4",
              "on-error-container": "#93000a",
              "on-tertiary": "#ffffff",
              "on-primary-fixed-variant": "#7a3000",
              "tertiary-container": "#74584c",
              "surface-container-highest": "#e4e2dd",
              "accent-mint": "#00ff88",
              "on-secondary-container": "#61615d",
              background: "#fbf9f4",
              "error-container": "#ffdad6",
              "surface-container-high": "#eae8e3",
              "on-error": "#ffffff",
              "surface-tint": "#a04100",
              "border-muted": "#e7e2da",
              "secondary-fixed": "#e4e2dd",
              outline: "#8a7267",
              tertiary: "#5a4136",
              surface: "#fbf9f4",
              "primary-container": "#a04100",
              secondary: "#5e5f5b",
              "surface-container-low": "#f5f3ee",
              "surface-off-white": "#f7f5f2",
              "primary-fixed-dim": "#ffb693",
              "on-background": "#1b1c19",
              "primary-fixed": "#ffdbcc",
              "outline-variant": "#ddc1b4",
              "surface-cream": "#fbf9f4",
              "on-secondary-fixed": "#1b1c19",
              primary: "#7a3000",
              "on-primary-container": "#ffceb8",
              "on-tertiary-container": "#f5d1c1",
              "success-bg": "#ebf7f0",
              "tertiary-fixed": "#ffdbcc",
              "on-secondary-fixed-variant": "#464743",
              "tertiary-fixed-dim": "#e3bfb0",
              "surface-variant": "#e4e2dd",
              "on-tertiary-fixed-variant": "#5a4136",
              "secondary-container": "#deddd8",
              "surface-dim": "#dbdad5",
              "inverse-on-surface": "#f2f1ec",
              "success-green": "#2d7a4d",
              "ai-grey": "#757575",
              "on-secondary": "#ffffff",
              "secondary-fixed-dim": "#c7c6c2",
              "on-surface-variant": "#574239",
            },
            borderRadius: {
              DEFAULT: "0.25rem",
              lg: "0.5rem",
              xl: "0.75rem",
              full: "9999px",
            },
            spacing: {
              "stack-md": "16px",
              "section-gap": "160px",
              "card-padding": "40px",
              "stack-sm": "8px",
              "stack-lg": "24px",
              gutter: "32px",
              "margin-page": "64px",
              "container-max": "1280px",
            },
            fontFamily: {
              "label-caps": ["Hanken Grotesk"],
              "display-lg": ["Hanken Grotesk"],
              "body-md": ["Hanken Grotesk"],
              "headline-md": ["Hanken Grotesk"],
              "mono-label": ["JetBrains Mono"],
              "headline-lg": ["Hanken Grotesk"],
              "body-lg": ["Hanken Grotesk"],
            },
            fontSize: {
              "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.08em", fontWeight: "600" }],
              "display-lg": ["64px", { lineHeight: "72px", letterSpacing: "-0.02em", fontWeight: "700" }],
              "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
              "headline-md": ["28px", { lineHeight: "36px", fontWeight: "600" }],
              "mono-label": ["14px", { lineHeight: "20px", fontWeight: "500" }],
              "headline-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.01em", fontWeight: "600" }],
              "body-lg": ["20px", { lineHeight: "30px", fontWeight: "400" }],
            },
          },
        },
      };
    };
    document.head.appendChild(twScript);

    // Same custom CSS as the original <style> block
    const styleTag = document.createElement("style");
    styleTag.setAttribute("data-primordial", "true");
    styleTag.innerHTML = `
      .surface-shadow { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02); }
      .modal-shadow { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
      .thin-border { border: 1px solid rgba(0, 0, 0, 0.06); }
      .custom-scrollbar::-webkit-scrollbar { width: 4px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: #e7e2da; border-radius: 10px; }
    `;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(fontLink1);
      document.head.removeChild(fontLink2);
      document.head.removeChild(twScript);
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen overflow-hidden">
      {/* BACKGROUND: Documents Page Container (Blurred) */}
      <div className="fixed inset-0 flex flex-col blur-[8px] select-none pointer-events-none grayscale-[0.2]">
        {/* TopNavBar */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-on-surface/10 docked full-width top-0 z-50 flex items-center justify-between px-margin-page py-4 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-8">
            <span className="font-display-lg text-headline-md tracking-tight text-on-surface">
              PRIMORDIAL
            </span>
            <div className="hidden md:flex gap-6">
              <span className="text-primary font-body-md border-b-2 border-primary py-1">
                Documents
              </span>
              <span className="text-on-surface-variant/60 font-body-md hover:text-on-surface transition-colors cursor-pointer">
                Dashboard
              </span>
              <span className="text-on-surface-variant/60 font-body-md hover:text-on-surface transition-colors cursor-pointer">
                Brain Map
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-full border border-on-surface/5">
              <span className="material-symbols-outlined text-on-surface-variant/60 text-[20px]">
                search
              </span>
              <span className="text-on-surface-variant/60 font-body-md">Quick search...</span>
            </div>
            <div className="flex gap-2">
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">
                notifications
              </span>
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">
                settings
              </span>
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-on-surface/10">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest"></div>
              <span className="text-on-surface font-body-md font-semibold">John Founder</span>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* SideNavBar */}
          <aside className="h-screen w-64 bg-surface-off-white border-r border-border-muted flex flex-col p-stack-md gap-stack-sm flex-shrink-0">
            <div className="mb-8 px-2">
              <h2 className="font-display-lg text-headline-md text-on-surface">PRIMORDIAL</h2>
              <span className="font-mono-label text-[10px] uppercase text-on-surface-variant/60 tracking-widest">
                VNT-2847-X
              </span>
            </div>
            <nav className="flex flex-col gap-1">
              <div className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all cursor-pointer">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="font-body-md">Dashboard</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all cursor-pointer">
                <span className="material-symbols-outlined">folder_open</span>
                <span className="font-body-md">Workspace</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 bg-surface-container-high text-on-surface font-semibold rounded-lg transition-all cursor-pointer">
                <span className="material-symbols-outlined">description</span>
                <span className="font-body-md">Documents</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all cursor-pointer">
                <span className="material-symbols-outlined">psychology</span>
                <span className="font-body-md">Brain Map</span>
              </div>
            </nav>
            <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-border-muted">
              <div className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all cursor-pointer">
                <span className="material-symbols-outlined">settings</span>
                <span className="font-body-md">Settings</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all cursor-pointer">
                <span className="material-symbols-outlined">logout</span>
                <span className="font-body-md">Logout</span>
              </div>
            </div>
          </aside>

          {/* Content Canvas */}
          <main className="flex-1 overflow-y-auto bg-surface p-margin-page">
            <div className="max-w-container-max mx-auto">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h1 className="font-headline-lg text-headline-lg mb-2">Venture Documents</h1>
                  <p className="text-on-surface-variant/70 max-w-xl">
                    Central repository for all strategic, technical, and operational documentation
                    governing the current venture cycle.
                  </p>
                </div>
                <button className="bg-on-surface text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Create Document
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div className="bg-white p-card-padding thin-border rounded-xl surface-shadow">
                  <span className="font-mono-label text-label-caps text-on-surface-variant/40">
                    01
                  </span>
                  <h3 className="font-headline-md text-headline-md mt-4">Market Analysis</h3>
                  <p className="text-on-surface-variant/60 mt-2">
                    Q3 2024 Market Penetration Strategy and Competitor Audit.
                  </p>
                </div>
                <div className="bg-white p-card-padding thin-border rounded-xl surface-shadow">
                  <span className="font-mono-label text-label-caps text-on-surface-variant/40">
                    02
                  </span>
                  <h3 className="font-headline-md text-headline-md mt-4">Product Roadmap</h3>
                  <p className="text-on-surface-variant/60 mt-2">
                    Core AI Integration Timeline and Feature Prioritization.
                  </p>
                </div>
                <div className="bg-white p-card-padding thin-border rounded-xl surface-shadow">
                  <span className="font-mono-label text-label-caps text-on-surface-variant/40">
                    03
                  </span>
                  <h3 className="font-headline-md text-headline-md mt-4">Business Canvas</h3>
                  <p className="text-on-surface-variant/60 mt-2">
                    Revenue streams and strategic partnership modeling.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* OVERLAY & MODAL */}
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[100] backdrop-blur-[2px]">
        {/* Modal Container */}
        <div className="bg-white w-full max-w-[640px] rounded-[12px] border border-border-muted modal-shadow flex flex-col animate-in fade-in zoom-in-95 duration-200">
          {/* Modal Header */}
          <div className="p-stack-lg border-b border-border-muted">
            <div className="flex justify-between items-start mb-1">
              <h2 className="font-headline-md text-[24px] text-on-surface">Create New Document</h2>
              <button className="text-on-surface-variant/40 hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-on-surface-variant/70 text-body-md leading-relaxed">
              Create a new venture document to organize and manage important business information.
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-stack-lg flex-1 custom-scrollbar overflow-y-auto max-h-[716px]">
            <form className="space-y-6">
              {/* Document Name */}
              <div className={nameField.focused ? "focused-input" : ""}>
                <label className="block font-semibold text-on-surface mb-2 text-label-caps uppercase tracking-wider">
                  Document Name
                </label>
                <input
                  className="w-full bg-surface-off-white border border-border-muted rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-on-surface/20 transition-all placeholder:text-on-surface-variant/40"
                  placeholder="Enter document name"
                  type="text"
                  onFocus={nameField.onFocus}
                  onBlur={nameField.onBlur}
                />
              </div>

              {/* Document Type & Initial Status Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className={typeField.focused ? "focused-input" : ""}>
                  <label className="block font-semibold text-on-surface mb-2 text-label-caps uppercase tracking-wider">
                    Document Type
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-surface-off-white border border-border-muted rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-on-surface/20 transition-all cursor-pointer"
                      onFocus={typeField.onFocus}
                      onBlur={typeField.onBlur}
                    >
                      <option>Market</option>
                      <option>Product</option>
                      <option>Business</option>
                      <option>Technology</option>
                      <option>Custom</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/40">
                      expand_more
                    </span>
                  </div>
                </div>
                <div className={statusField.focused ? "focused-input" : ""}>
                  <label className="block font-semibold text-on-surface mb-2 text-label-caps uppercase tracking-wider">
                    Initial Status
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-surface-off-white border border-border-muted rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-on-surface/20 transition-all cursor-pointer"
                      onFocus={statusField.onFocus}
                      onBlur={statusField.onBlur}
                    >
                      <option>Draft</option>
                      <option>In Progress</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/40">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className={descField.focused ? "focused-input" : ""}>
                <label className="block font-semibold text-on-surface mb-2 text-label-caps uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  className="w-full bg-surface-off-white border border-border-muted rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-on-surface/20 transition-all placeholder:text-on-surface-variant/40 resize-none"
                  placeholder="Briefly describe the purpose of this document."
                  rows={3}
                  onFocus={descField.onFocus}
                  onBlur={descField.onBlur}
                ></textarea>
              </div>

              {/* Visibility & Owner Grid */}
              <div className="grid grid-cols-2 gap-8 items-start">
                <div>
                  <label className="block font-semibold text-on-surface mb-3 text-label-caps uppercase tracking-wider">
                    Visibility
                  </label>
                  <div className="flex flex-col gap-3">
                    <label
                      className={`flex items-center gap-3 cursor-pointer group ${
                        radio1Field.focused ? "focused-input" : ""
                      }`}
                    >
                      <div className="relative flex items-center justify-center">
                        <input
                          defaultChecked
                          className="peer appearance-none w-5 h-5 border-2 border-border-muted rounded-full checked:border-on-surface transition-all"
                          name="visibility"
                          type="radio"
                          onFocus={radio1Field.onFocus}
                          onBlur={radio1Field.onBlur}
                        />
                        <div className="absolute w-2.5 h-2.5 bg-on-surface rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                      </div>
                      <span className="text-on-surface group-hover:text-on-surface-variant transition-colors">
                        Venture Wide
                      </span>
                    </label>
                    <label
                      className={`flex items-center gap-3 cursor-pointer group ${
                        radio2Field.focused ? "focused-input" : ""
                      }`}
                    >
                      <div className="relative flex items-center justify-center">
                        <input
                          className="peer appearance-none w-5 h-5 border-2 border-border-muted rounded-full checked:border-on-surface transition-all"
                          name="visibility"
                          type="radio"
                          onFocus={radio2Field.onFocus}
                          onBlur={radio2Field.onBlur}
                        />
                        <div className="absolute w-2.5 h-2.5 bg-on-surface rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                      </div>
                      <span className="text-on-surface group-hover:text-on-surface-variant transition-colors">
                        Private
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-2 text-label-caps uppercase tracking-wider">
                    Owner
                  </label>
                  <div className="flex items-center gap-3 bg-surface-container-low border border-border-muted rounded-lg px-4 py-3 cursor-not-allowed opacity-80">
                    <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <span className="text-[10px] font-bold">JF</span>
                    </div>
                    <span className="text-on-surface font-body-md">John Founder</span>
                    <span className="material-symbols-outlined ml-auto text-[18px] text-on-surface-variant/30">
                      lock
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="p-stack-lg border-t border-border-muted flex justify-between items-center bg-surface-off-white rounded-b-[12px]">
            <button className="px-8 py-2.5 rounded-full border border-on-surface/10 text-on-surface font-semibold hover:bg-surface-container-low transition-all active:scale-[0.98]">
              Cancel
            </button>
            <button className="px-8 py-2.5 bg-on-surface text-white rounded-full font-semibold hover:bg-black/90 transition-all shadow-lg active:scale-[0.98] flex items-center gap-2">
              Create Document
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
