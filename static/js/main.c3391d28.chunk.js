(this["webpackJsonpfinal-project-starter"]=this["webpackJsonpfinal-project-starter"]||[]).push([[0],{38:function(e,t,c){},39:function(e,t,c){},44:function(e,t,c){"use strict";c.r(t);var s=c(0),a=c.n(s),n=c(11),r=c.n(n),i=(c(38),c(12)),j=c(6),l=(c(39),c(48)),d=c(46),b=c(26),o=c(52),u=c(1);function O(e){var t=e.showModal,c=e.deleteAllSemesters;return Object(u.jsxs)(b.a,{"data-testid":"Control Panel",children:[Object(u.jsx)(d.a,{children:Object(u.jsx)(b.a,{})}),Object(u.jsx)(d.a,{children:Object(u.jsx)(b.a,{children:Object(u.jsx)(o.a,{className:"button","data-testid":"add-semester-button",id:"add-semester-button",onClick:function(){return t(!0)},children:"Add Semester"})})}),Object(u.jsx)(d.a,{children:Object(u.jsx)(b.a,{children:Object(u.jsx)(o.a,{className:"button",variant:"danger",id:"delete-all-button",onClick:function(){return c()},children:"Delete All Semesters"})})})]})}var h=c(49),m=c(31),x=c(50),p=c(13),f=c(32),S=c(23),g=c(47);function v(e){var t=e.semester;function c(){switch(t.season){case 0:return"Fall";case 1:return"Winter";case 2:return"Spring";case 3:return"Summer"}}return Object(u.jsxs)(g.a,{id:"semester-table",children:[Object(u.jsx)("thead",{className:"thead-dark",children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{scope:"col",children:"Course"}),Object(u.jsx)("th",{scope:"col",children:"Season"}),Object(u.jsx)("th",{scope:"col",children:"Year"})]})}),Object(u.jsx)("tbody",{children:t.courseList.map((function(e,s){return Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{id:"course-name",children:e.department+e.courseID}),Object(u.jsx)("td",{id:"semester-season",children:c()}),Object(u.jsx)("td",{id:"semester-year",children:t.year})]},s)}))})]})}function C(e){var t=e.addSemester,c=e.setVisible,a=e.visible,n=Object(s.useState)(0),r=Object(j.a)(n,2),l=r[0],O=r[1],g=Object(s.useState)(xe()),C=Object(j.a)(g,2),y=C[0],N=C[1],k=Object(s.useState)([]),D=Object(j.a)(k,2),w=D[0],F=D[1],L=Object(s.useState)(0),A=Object(j.a)(L,2),T=A[0],I=A[1],B=Object(s.useState)(0),W=Object(j.a)(B,2),G=W[0],M=W[1],P=Object(s.useState)(""),R=Object(j.a)(P,2),q=R[0],H=R[1],J=Object(s.useState)(0),V=Object(j.a)(J,2),Y=V[0],z=V[1],E=Object(s.useState)(""),U=Object(j.a)(E,2),X=U[0],K=U[1],Q=Object(s.useState)(""),Z=Object(j.a)(Q,2),$=Z[0],_=Z[1],ee=Object(s.useState)(0),te=Object(j.a)(ee,2),ce=te[0],se=te[1],ae=Object(s.useState)([]),ne=Object(j.a)(ae,2),re=ne[0],ie=ne[1],je=Object(s.useState)([]),le=Object(j.a)(je,2),de=le[0],be=le[1],oe=Object(s.useState)([1]),ue=Object(j.a)(oe,2),Oe=ue[0],he=ue[1],me=function(){return c(!1)};function xe(){return(new Date).getFullYear()}function pe(e){"Fall"===e?O(0):"Winter"===e?O(1):"Spring"===e?O(2):"Summer"===e&&O(3)}function fe(){O(0),N(0),F([]),I(0),M(0),H(""),z(0),_(""),se(0),ie([]),be([]),he([])}return Object(u.jsxs)(h.a,{show:a,onHide:me,backdrop:"static",keyboard:!1,"data-testid":"add-semester-modal",size:"lg",children:[Object(u.jsx)(S.a,{closeButton:!0,onClick:fe}),Object(u.jsxs)(m.a,{children:[Object(u.jsx)(d.a,{children:Object(u.jsxs)(x.a,{className:"d-flex",id:"search-course-formm",onSubmit:function(e){e.preventDefault(),I(0),M(0),K(""),_(""),se(0),ie([]),be([]),he([1]),F([].concat(Object(i.a)(w),[{department:q,courseID:Y,title:X,description:$,credits:ce,preReqs:re,coReqs:de,semestersOffered:Oe}]))},children:[Object(u.jsxs)(x.a.Group,{children:[Object(u.jsx)(x.a.Label,{children:"Department"}),Object(u.jsx)(x.a.Control,{"data-testid":"department-name-input",id:"department-name",as:"textarea",rows:1,minLength:3,maxLength:4,onChange:function(e){return H(e.target.value.toUpperCase())}})]}),Object(u.jsxs)(x.a.Group,{children:[Object(u.jsx)(x.a.Label,{children:"Course ID"}),Object(u.jsx)(x.a.Control,{"data-testid":"CourseID-input",id:"course-id",as:"input",type:"number",min:100,onChange:function(e){return z(e.target.valueAsNumber)}})]}),Object(u.jsx)(o.a,{className:"button",type:"submit","data-testid":"search-course-button",id:"search-course-button",disabled:!(q.length>0&&Y>=100&&y>=xe()),children:"Search"})]})}),Object(u.jsx)("br",{}),Object(u.jsxs)(d.a,{children:[Object(u.jsxs)(b.a,{children:[Object(u.jsx)(p.a,{inline:!0,type:"radio",value:"Fall",name:"season",label:"Fall",checked:0===l,onChange:function(e){return pe(e.target.value)}}),Object(u.jsx)(p.a,{inline:!0,type:"radio",value:"Winter",name:"season",label:"Winter",checked:1===l,onChange:function(e){return pe(e.target.value)}}),Object(u.jsx)(p.a,{inline:!0,type:"radio",value:"Spring",name:"season",label:"Spring",checked:2===l,onChange:function(e){return pe(e.target.value)}}),Object(u.jsx)(p.a,{inline:!0,type:"radio",value:"Summer",name:"season",label:"Summer",checked:3===l,onChange:function(e){return pe(e.target.value)}})]}),Object(u.jsx)(b.a,{children:Object(u.jsx)(f.a,{"data-testid":"year-input",id:"year-input",as:"input",type:"number",min:xe(),onChange:function(e){return N(e.target.valueAsNumber)}})})]}),Object(u.jsx)(d.a,{children:Object(u.jsx)(v,{semester:{season:l,year:y,courseList:w,creditTotal:T,expectedTuition:G}})}),Object(u.jsxs)(d.a,{"data-testid":"Bottom Row",children:[Object(u.jsx)(b.a,{children:Object(u.jsx)(o.a,{className:"button",id:"clear-course-list-button",variant:"danger",onClick:function(){F([])},children:"Clear Semester"})}),Object(u.jsx)(b.a,{}),Object(u.jsx)(b.a,{children:Object(u.jsx)(o.a,{className:"button",id:"save-semester-button",onClick:function(){t({season:l,year:y,courseList:w,creditTotal:T,expectedTuition:G}),fe(),me()},disabled:!w.length,children:"Save Semester"})})]}),Object(u.jsx)(d.a,{})]})]})}var y=c(51);function N(e){var t=e.semester,c=e.deleteSemester;return Object(u.jsxs)(y.a,{bg:"Light",className:"text-center",children:[Object(u.jsx)(y.a.Header,{children:Object(u.jsx)(l.a,{fluid:!0,children:Object(u.jsxs)(d.a,{children:[Object(u.jsxs)("div",{className:"flex-container",children:[Object(u.jsx)("div",{className:"left-semester-container"}),Object(u.jsx)("div",{className:"middle-semester-container",children:"Semester"}),Object(u.jsx)("div",{className:"right-semester-container",children:"X"})]}),Object(u.jsx)(b.a,{}),Object(u.jsx)(b.a,{children:Object(u.jsx)("h1",{children:"[test]"})}),Object(u.jsx)(b.a,{children:Object(u.jsx)(o.a,{variant:"danger",onClick:function(){return c(0)},children:"Delete Semester"})})]})})}),Object(u.jsxs)(y.a.Body,{children:[Object(u.jsx)(y.a.Title,{children:"Special title treatment"}),Object(u.jsx)(g.a,{children:Object(u.jsx)(v,{semester:t})}),Object(u.jsx)("p",{children:"hello"}),Object(u.jsx)(o.a,{variant:"primary",children:"Go somewhere"})]}),Object(u.jsx)(y.a.Footer,{className:"text-muted",children:"2 days ago"})]})}function k(e){var t=e.semesters,c=e.deleteSemester;return Object(u.jsx)("div",{className:"plan-table",children:t.map((function(e){return Object(u.jsx)(N,{semester:e,deleteSemester:c})}))})}var D=function(){var e=Object(s.useState)([]),t=Object(j.a)(e,2),c=t[0],a=t[1],n=Object(s.useState)(!1),r=Object(j.a)(n,2),b=r[0],o=r[1];return Object(u.jsxs)(l.a,{className:"App",children:[Object(u.jsx)(d.a,{children:Object(u.jsx)("br",{})}),Object(u.jsx)(d.a,{children:Object(u.jsx)(O,{showModal:o,deleteAllSemesters:function(){a([]),console.log("Deleted All Semesters")}})}),Object(u.jsx)(d.a,{children:Object(u.jsx)(C,{addSemester:function(e){a([].concat(Object(i.a)(c),[e]))},setVisible:o,visible:b})}),Object(u.jsx)(d.a,{children:Object(u.jsx)(k,{semesters:c,deleteSemester:function(e){var t=Object(i.a)(c);t.splice(e,1),a(Object(i.a)(t))}})})]})},w=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,53)).then((function(t){var c=t.getCLS,s=t.getFID,a=t.getFCP,n=t.getLCP,r=t.getTTFB;c(e),s(e),a(e),n(e),r(e)}))};c(43);r.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(D,{})}),document.getElementById("root")),w()}},[[44,1,2]]]);
//# sourceMappingURL=main.c3391d28.chunk.js.map