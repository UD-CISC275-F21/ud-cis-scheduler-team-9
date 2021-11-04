(this["webpackJsonpfinal-project-starter"]=this["webpackJsonpfinal-project-starter"]||[]).push([[0],{33:function(e){e.exports=JSON.parse('{"CISC108":{"department":"CISC","courseID":108,"title":"Introduction to Computer Science I","description":"Computing and principles of programming with an emphasis on systematic program design. Topics include functional programming, data abstraction, procedural abstraction, use of control and state, recursion, testing, and object-oriented programming concepts. Requires no prior programming experience, open to any major, but intended primarily for majors and minors in computer science or mathematics.","credits":3,"preReqs":[[""]],"coReqs":[["MATH115","MATH117"]],"semestersOffered":[0,2]},"CISC181":{"department":"CISC","courseID":181,"title":"Introduction to Computer Science II","description":"Principles of computer science illustrated and applied through programming in an object oriented language. Programming projects illustrate computational problems, styles and issues that arise in computer systems development and in all application areas of computation.","credits":3,"preReqs":[["CISC108","CISC106"]],"coReqs":[["MATH221","MATH241"]],"semestersOffered":[0,1,2]},"MATH210":{"department":"MATH","courseID":210,"title":"Discrete Mathematics I","description":"Elements of sets and logic. Relations, functions. Integers. Induction and recursion. Principles and techniques of counting. Graphs. Paths and circuits","credits":3,"preReqs":[[""]],"coReqs":[["MATH241","MATH242","MATH232"]],"semestersOffered":[0,1,2]},"ENGL110":{"department":"ENGL","courseID":110,"title":"Seminar in Composition","description":"Introduction to the process of academic writing that centers on the composition of analytical, research-based essays.","credits":3,"preReqs":[[""]],"coReqs":[[""]],"semestersOffered":[0,1,2,3]},"CISC210":{"department":"CISC","courseID":210,"title":"Introduction to Systems Programming","description":"Principles of computer systems programming for software and hardware platforms to achieve efficient resource usage. Topics include the C programming language, memory management, and awareness of system constraints and interfacing. Projects include programming embedded systems and interactive objects.","credits":3,"preReqs":[["CISC108","CISC106"]],"coReqs":[["MATH221","MATH241"]],"semestersOffered":[0,2]},"MATH241":{"department":"MATH","courseID":241,"title":"Analytic Geometry and Calculus A","description":"Functions, limits, continuity, derivatives. Polynomial, rational, exponential, hyperbolic, logarithmic, trigonometric and inverse trigonometric functions. Definite and indefinite integrals and the Fundamental Theorem of Calculus. Simple differential equations (separable ODE, linear ODE). ODE models leading to exponential growth and decay.","credits":3,"preReqs":[[""]],"coReqs":[[""]],"semestersOffered":[0,1,2,3]}}')},39:function(e,t,s){},40:function(e,t,s){},45:function(e,t,s){"use strict";s.r(t);var r=s(1),n=s.n(r),c=s(11),a=s.n(c),i=(s(39),s(12)),o=s(6),d=(s(40),s(49)),l=s(47),j=s(26),u=s(53),b=s(0);function m(e){var t=e.showModal,s=e.deleteAllSemesters;return Object(b.jsxs)(j.a,{"data-testid":"control-panel",children:[Object(b.jsx)(l.a,{children:Object(b.jsx)(j.a,{})}),Object(b.jsx)(l.a,{children:Object(b.jsx)(j.a,{children:Object(b.jsx)(u.a,{className:"button","data-testid":"add-semester-button",id:"add-semester-button",onClick:function(){return t(!0)},children:"Add Semester"})})}),Object(b.jsx)(l.a,{children:Object(b.jsx)(j.a,{children:Object(b.jsx)(u.a,{className:"button",variant:"danger",id:"delete-all-semesters-button",onClick:function(){return s()},children:"Delete All Semesters"})})})]})}var O=s(8),h=s(2),p=s(50),x=s(31),f=s(51),g=s(13),S=s(32),C=s(52),v=s(23),y=s(48);function T(e){var t=e.semester;return Object(b.jsxs)(y.a,{id:"semester-table",children:[Object(b.jsx)("thead",{className:"thead-dark",children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{scope:"col",children:"Course"}),Object(b.jsx)("th",{scope:"col",children:"Title"}),Object(b.jsx)("th",{scope:"col",children:"Description"}),Object(b.jsx)("th",{scope:"col",children:"Credits"}),Object(b.jsx)("th",{scope:"col",children:"Edit:"})]})}),Object(b.jsx)("tbody",{children:Object.values(t.courseRecord).map((function(e,t){return Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{id:"course-name",children:e.department+e.courseID}),Object(b.jsx)("td",{id:"course-title",children:e.title}),Object(b.jsx)("td",{id:"course-description",children:e.description}),Object(b.jsx)("td",{id:"course-credits",children:e.credits}),Object(b.jsx)("td",{id:"course-edit-button",children:Object(b.jsx)(u.a,{variant:"primary",children:"Edit Course"})})]},t)}))})]})}function I(e){var t=e.addSemester,s=e.checkSemester,n=e.setVisible,c=e.visible,a=e.catalog,i=Object(r.useState)(0),d=Object(o.a)(i,2),m=d[0],y=d[1],I=Object(r.useState)(Re()),A=Object(o.a)(I,2),R=A[0],D=A[1],k=Object(r.useState)({}),q=Object(o.a)(k,2),M=q[0],N=q[1],E=Object(r.useState)(0),w=Object(o.a)(E,2),H=w[0],F=w[1],P=Object(r.useState)(0),L=Object(o.a)(P,2),B=L[0],G=L[1],W={season:m,year:R,courseRecord:M,creditTotal:H,expectedTuition:B},J=Object(r.useState)(""),V=Object(o.a)(J,2),Y=V[0],z=V[1],U=Object(r.useState)(0),K=Object(o.a)(U,2),Q=K[0],X=K[1],Z=Object(r.useState)(""),$=Object(o.a)(Z,2),_=$[0],ee=$[1],te=Object(r.useState)(""),se=Object(o.a)(te,2),re=se[0],ne=se[1],ce=Object(r.useState)(0),ae=Object(o.a)(ce,2),ie=ae[0],oe=ae[1],de=Object(r.useState)([[]]),le=Object(o.a)(de,2),je=le[0],ue=le[1],be=Object(r.useState)([[]]),me=Object(o.a)(be,2),Oe=me[0],he=me[1],pe=Object(r.useState)([]),xe=Object(o.a)(pe,2),fe=xe[0],ge=xe[1],Se={department:Y,courseID:Q,title:_,description:re,credits:ie,preReqs:je,coReqs:Oe,semestersOffered:fe},Ce=Object(r.useState)(!1),ve=Object(o.a)(Ce,2),ye=ve[0],Te=ve[1],Ie=function(){return n(!1)};function Ae(e){var t=Y+Q;N(Object(h.a)(Object(h.a)({},M),{},Object(O.a)({},t,e))),F(function(e){var t=0,s=0,r=Object.keys(e),n=[];for(t=0;t<r.length;t++)n.push(e[r[t]]);for(;t!=n.length;)s+=n[t].credits,t++;return s}(M)),G(B)}function Re(){return(new Date).getFullYear()}function De(e){"Fall"===e?y(3):"Winter"===e?y(0):"Spring"===e?y(1):"Summer"===e&&y(2)}function ke(e){var t;if(ye){var s=e[0][0];for(t=1;t<e[0].length;t++)s=s+", "+e[0][t];return s}}function qe(){y(0),D(0),N({}),F(0),G(0),z(""),X(0),ne(""),oe(0),ue([[""]]),he([[""]]),ge([]),Te(!1)}return Object(b.jsxs)(p.a,{show:c,onHide:Ie,backdrop:"static",keyboard:!1,"data-testid":"add-semester-modal",size:"lg",children:[Object(b.jsx)(v.a,{closeButton:!0,onClick:qe}),Object(b.jsxs)(x.a,{children:[Object(b.jsx)(l.a,{children:Object(b.jsxs)(f.a,{className:"d-flex",id:"search-course-formm",onSubmit:function(e){e.preventDefault();var t={department:"",courseID:0,title:"",description:"",credits:0,preReqs:[[""]],coReqs:[[""]],semestersOffered:[]};a[Y+Q]&&(t=function(e,t){return a[e+t]}(Y,Q),Te(!0)),ee(t.title),ne(t.description),oe(t.credits),ue(t.preReqs),he(t.coReqs),ge(t.semestersOffered)},children:[Object(b.jsxs)(f.a.Group,{children:[Object(b.jsx)(f.a.Label,{children:"Department"}),Object(b.jsx)(f.a.Control,{"data-testid":"department-name-input",id:"department-name",as:"textarea",rows:1,minLength:3,maxLength:4,onChange:function(e){return z(e.target.value.toUpperCase())}})]}),Object(b.jsxs)(f.a.Group,{children:[Object(b.jsx)(f.a.Label,{children:"Course ID"}),Object(b.jsx)(f.a.Control,{"data-testid":"CourseID-input",id:"course-id",as:"input",type:"number",min:100,onChange:function(e){return X(e.target.valueAsNumber)}})]}),Object(b.jsx)(u.a,{className:"button",type:"submit","data-testid":"search-course-button",id:"search-course-button",disabled:!(Y.length>0&&Q>=100&&R>=Re()),children:"Search"}),Object(b.jsx)(u.a,{className:"button",type:"submit","data-testid":"add-course-button",id:"add-course-button",onClick:function(){return Ae(Se)},disabled:!(""!=Y&&0!=Q&&""!=_&&""!=re&&0!=ie&&je!=[[]]&&Oe!=[[]]&&fe!=[]),children:"Add"})]})}),Object(b.jsx)("br",{}),Object(b.jsxs)(l.a,{children:[Object(b.jsxs)(j.a,{children:[Object(b.jsx)(g.a,{inline:!0,type:"radio",value:"Fall",name:"season",label:"Fall",checked:3===m,onChange:function(e){return De(e.target.value)}}),Object(b.jsx)(g.a,{inline:!0,type:"radio",value:"Winter",name:"season",label:"Winter",checked:0===m,onChange:function(e){return De(e.target.value)}}),Object(b.jsx)(g.a,{inline:!0,type:"radio",value:"Spring",name:"season",label:"Spring",checked:1===m,onChange:function(e){return De(e.target.value)}}),Object(b.jsx)(g.a,{inline:!0,type:"radio",value:"Summer",name:"season",label:"Summer",checked:2===m,onChange:function(e){return De(e.target.value)}})]}),Object(b.jsx)(j.a,{children:Object(b.jsx)(S.a,{"data-testid":"year-input",id:"year-input",as:"input",type:"number",placeholder:"Year",min:Re(),max:Re()+6,onChange:function(e){return D(e.target.valueAsNumber)}})})]}),Object(b.jsx)(l.a,{children:ye&&Object(b.jsx)(C.a,{id:"course-card",children:Object(b.jsxs)(C.a.Body,{children:[Object(b.jsxs)(C.a.Title,{children:[Y,Q,": ",_,Object(b.jsxs)(C.a.Text,{children:[" Credits: ",ie]})]}),Object(b.jsx)(C.a.Text,{children:re}),Object(b.jsxs)(C.a.Text,{children:["Prereqs: ",ke(je)]}),Object(b.jsxs)(C.a.Text,{children:["Coreqs: ",ke(Oe)]}),Object(b.jsxs)(C.a.Text,{children:["Semesters: ",function(){var e=0,t="";return fe.forEach((function(s){switch(s){case 0:t+="Winter";break;case 1:t+="Spring";break;case 2:t+="Summer";break;case 3:t+="Fall"}++e<fe.length&&(t+=", ")})),t}()]})]})})}),Object(b.jsx)(l.a,{children:Object(b.jsx)(T,{semester:{season:m,year:R,courseRecord:M,creditTotal:H,expectedTuition:B}})}),Object(b.jsxs)(l.a,{"data-testid":"Bottom Row",children:[Object(b.jsx)(j.a,{children:Object(b.jsx)(u.a,{className:"button",id:"clear-course-list-button",variant:"danger",onClick:function(){N({})},children:"Clear Semester"})}),Object(b.jsx)(j.a,{}),Object(b.jsx)(j.a,{children:Object(b.jsx)(u.a,{className:"button",id:"save-semester-button",onClick:function(){t(W),qe(),Te(!1),Ie()},disabled:!(Object.values(M).length>0&&!s(W)),children:"Save Semester"})})]}),Object(b.jsx)(l.a,{})]})]})}function A(e){var t=e.semester,s=e.deleteSemester;function r(e){switch(e){case 3:return"Fall";case 0:return"Winter";case 1:return"Spring";case 2:return"Summer";default:return"Inproper Semester"}}return Object(b.jsxs)(C.a,{bg:"Light",className:"text-center",children:[Object(b.jsx)(C.a.Header,{children:Object(b.jsx)(d.a,{children:Object(b.jsx)(l.a,{children:Object(b.jsxs)("div",{className:"flex-container",children:[Object(b.jsx)("div",{className:"middle-semester-container",children:Object(b.jsx)(j.a,{children:Object(b.jsx)("h1",{children:"Semester: "+r(t.season)+" "+t.year})})}),Object(b.jsx)("div",{className:"right-semester-container",children:Object(b.jsx)(u.a,{variant:"danger",onClick:function(){return s(t)},children:"Delete Semester"})})]})})})}),Object(b.jsxs)(C.a.Body,{children:[Object(b.jsx)(C.a.Title,{children:"Courses:"}),Object(b.jsx)(l.a,{children:Object(b.jsx)(T,{semester:t})}),Object(b.jsx)("p",{children:"PLACEHOLDER FOR SEMESTER STATS (TOT CREDITS, ESTIMATED COST, ETC)"})]}),Object(b.jsx)(C.a.Footer,{children:Object(b.jsxs)(u.a,{variant:"primary",children:["Add Semester: ",r((t.season+1)%4)]})})]})}function R(e){var t=e.semesters,s=e.deleteSemester,r=e.showModal;var n=t.sort((function(e,t){return e.season-t.season})).sort((function(e,t){return e.year-t.year})).map((function(e){return Object(b.jsx)(A,{semester:e,deleteSemester:s},e.season.toString()+e.year.toString())}));n.push(Object(b.jsx)(C.a,{children:Object(b.jsx)(u.a,{className:"button","data-testid":"add-semester-button-plan-table",id:"add-semester-button-plan-table",onClick:function(){return r(!0)},children:"Add Semester"})}));for(var c=[],a=0;a<n.length;a+=2)c.push(n.slice(a,a+2));return Object(b.jsx)("div",{className:"plan-table",id:"plan-table",children:c.map((function(e){return e.length%2?Object(b.jsxs)(l.a,{children:[Object(b.jsx)(j.a,{children:e[0]}),Object(b.jsx)(j.a,{})]}):Object(b.jsxs)(l.a,{children:[Object(b.jsx)(j.a,{children:e[0]}),Object(b.jsx)(j.a,{children:e[1]})]})}))})}var D=s(33);var k=function(){var e=Object(r.useState)([]),t=Object(o.a)(e,2),s=t[0],n=t[1],c=Object(r.useState)(!1),a=Object(o.a)(c,2),j=a[0],u=a[1],O=D;return Object(b.jsxs)(d.a,{className:"App",children:[Object(b.jsx)(l.a,{children:Object(b.jsx)("br",{})}),Object(b.jsx)(l.a,{children:Object(b.jsx)(m,{showModal:u,deleteAllSemesters:function(){n([]),console.log("Deleted All Semesters")}})}),Object(b.jsx)(l.a,{children:Object(b.jsx)(I,{addSemester:function(e){n([].concat(Object(i.a)(s),[e]))},checkSemester:function(e){var t;for(t=0;t<s.length;t++)if(e.year===s[t].year&&e.season===s[t].season)return!0;return!1},setVisible:u,visible:j,catalog:O})}),Object(b.jsx)(l.a,{children:Object(b.jsx)(R,{semesters:s,deleteSemester:function(e){for(var t=0,r=0;r<s.length;r++)e.season===s[r].season&&e.year===s[r].year&&(t=r);var c=Object(i.a)(s);c.splice(t,1),n(Object(i.a)(c))},showModal:u})})]})},q=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,54)).then((function(t){var s=t.getCLS,r=t.getFID,n=t.getFCP,c=t.getLCP,a=t.getTTFB;s(e),r(e),n(e),c(e),a(e)}))};s(44);a.a.render(Object(b.jsx)(n.a.StrictMode,{children:Object(b.jsx)(k,{})}),document.getElementById("root")),q()}},[[45,1,2]]]);
//# sourceMappingURL=main.ce1e28f2.chunk.js.map