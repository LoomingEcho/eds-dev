import{i as s}from"./isSidekickLibraryActive.U-fJCMMj.js";import{e as c,i as o}from"./unsafe-html.C_rT9aKG.js";import{T as n}from"./lit-element.CH8ciVnL.js";const k=t=>{const i={dataLibraryId:void 0,innerHTML:"",href:""};if(!t)return i;i.innerHTML=t.innerHTML,t instanceof HTMLAnchorElement&&t.href!==""&&(i.href=t.href);const r=t.getAttribute("data-library-id");return s()&&r!==null&&(i.dataLibraryId=r),i};class f extends o{update(i,r){this.part=i;const a=r[0];return this.render(a)}render(i){var d;if(s()===!1)return n;const r=(d=this.part)==null?void 0:d.element,{dataLibraryId:a,href:e}=i;return a&&(r==null||r.setAttribute("data-library-id",a)),a&&(r==null||r.setAttribute("contenteditable","true")),e&&r instanceof HTMLAnchorElement&&(r==null||r.setAttribute("href",e)),n}}const h=c(f);export{k as e,h as g};
//# sourceMappingURL=sidekickLibraryId.CpwpqpkF.js.map
