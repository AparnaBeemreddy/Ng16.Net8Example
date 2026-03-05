import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { SkillModel } from '../../models/skill.model';
import { FilterComponent } from "./filter/filter.component";
import { SkillComponent } from "./skill/skill.component";

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [SkillComponent, CommonModule, FilterComponent],
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.scss'
})
export class SkillListComponent {
  skills = [
    {
      id: 1,
      name: "HTML5",
      description: "HTML5 is the latest version of the Hypertext Markup Language used for structuring and presenting content on the web.",
      icon: "./assets/html5.png",
      experience: 9,
      isCertified: true,
      certificateURL: "https://www.credential.net/12345678-90ab-cdef-1234-567890abcdef"
    },
    {
      id: 2,
      name: "JavaScript",
      description: "JavaScript is a programming language that conforms to the ECMAScript specification.",
      icon: "./assets/javascript.png",
      experience: 9,
      isCertified: true,
      certificateURL: "https://www.credential.net/98765432-10ba-fedc-9876-543210fedcba"
    },
    {
      id: 3,
      name: "CSS3",
      description: "CSS3 is the latest version of the Cascading Style Sheets language used for describing the presentation of a document written in HTML or XML.",
      icon: "./assets/css3.png",
      experience: 7,
      isCertified: true,
      certificateURL: "https://www.credential.net/11111111-2222-3333-4444-555555555555"
    },
    {
      id: 4,
      name: "Bootstrap",
      description: "Bootstrap is a popular CSS framework for building responsive web applications.",
      icon: "./assets/bootstrap.jpg",
      experience: 5,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 5,
      name: "Angular",
      description: "Angular is a platform for building mobile and desktop web applications.",
      icon: "./assets/angular.jpg",
      experience: 5,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 6,
      name: "TypeScript",
      description: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
      icon: "./assets/typescript.png",
      experience: 5,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 7,
      name: "RxJS",
      description: "RxJS is a library for reactive programming using Observables.",
      icon: "./assets/rxjs.jpg",
      experience: 5,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 8,
      name: "C#",
      description: "C# is a modern, object-oriented programming language developed by Microsoft.",
      icon: "./assets/csharp.png",
      experience: 6,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 9,
      name: "ASP.NET",
      description: "ASP.NET is a server-side web application framework designed for web development.",
      icon: "./assets/aspnet.jpg",
      experience: 5,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 10,
      name: ".NET Core",
      description: ".NET Core is a free, cross-platform, open-source developer platform for building many different types of applications.",
      icon: "./assets/dotnetcore.png",
      experience: 5,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 11,
      name: "Entity Framework Core",
      description: "Entity Framework Core is a lightweight, extensible, open-source and cross-platform version of the popular Entity Framework data access technology.",
      icon: "./assets/efcore.png",
      experience: 5,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 12,
      name: "SQL Server",
      description: "SQL Server is a relational database management system developed by Microsoft.",
      icon: "./assets/mssqlserver.png",
      experience: 5,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 13,
      name: "Git",
      description: "Git is a distributed version control system for tracking changes in source code.",
      icon: "./assets/git.png",
      experience: 6,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 14,
      name: "Azure",
      description: "Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers.",
      icon: "./assets/azure.jpg",
      experience: 4,
      isCertified: true,
      certificateURL: "https://www.credential.net/abcdef12-3456-7890-abcd-ef1234567890"
    },
    {
      id: 15,
      name: "Dapper",
      description: "Dapper is a simple object mapper for .NET that provides a high-performance alternative to Entity Framework.",
      icon: "./assets/dapper.png",
      experience: 0,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 16,
      name: "ADO.NET",
      description: "ADO.NET is a data access technology from the Microsoft .NET Framework that provides communication between relational and non-relational systems through a common set of components.",
      icon: "./assets/adonet.png",
      experience: 4,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 17,
      name: ".NET Framework",
      description: ".NET Framework is a software framework developed by Microsoft that runs primarily on Windows.",
      icon: "./assets/dotnetframework.png",
      experience: 5,
      isCertified: false,
      certificateURL: ""
    },
    {
      id: 18,
      name: "python",
      description: "Python is a high-level, interpreted programming language known for its readability and versatility.",
      icon: "./assets/python.jpg",
      experience: 3,
      isCertified: false,
      certificateURL: ""
    }
  ];

  totalSkillsCount: number = this.skills.length;
  certifiedSkillsCount: number = this.skills.filter(s => s.isCertified).length;
  selectedFilter: string = 'all';
  selectedSkill: SkillModel;

  @Input() searchText: string = '';

  onFilterChange(value: string) {
    debugger;
    this.selectedFilter = value;
  }
}
