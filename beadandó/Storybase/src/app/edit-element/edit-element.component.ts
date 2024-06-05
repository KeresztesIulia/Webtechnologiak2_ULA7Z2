import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryElement } from '../classes/categoryElement';
import { MaterialModule } from '../material.module';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Service } from '../../service';
import { Section } from '../classes/section';

@Component({
  selector: 'app-edit-element',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-element.component.html',
  styleUrl: './edit-element.component.css'
})
export class EditElementComponent implements OnInit {

  delay = 50;

  element: CategoryElement = new CategoryElement("","","");
  category: string = "";
  id: string = "";

  start = new Date().getTime()+10000;
  changes = 0;

  inputShows = {
    name: false,
    story: false,
    sectionTitles: [false]
  }

  elementForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    story: new FormControl('', Validators.required),
    sections: new FormArray([])
  });
  
  constructor(private route : ActivatedRoute, private service : Service){
  }

  get sections(){
    return this.elementForm.get("sections") as FormArray;
  }

  ngOnInit(){
    this.route.params.subscribe(
      (params) =>{
        this.id = params['id'];
        this.service.GetElement(this.id).subscribe((data) => {
          this.element = data;
          
          this.elementForm.controls['name'] = new FormControl(this.element.name, Validators.required);
          this.elementForm.controls['story'] = new FormControl(this.element.story, Validators.required);

          for (var section of this.element.sections){
            this.addSection(section.title, section.content, section.userDefined);
            this.inputShows.sectionTitles.push(false);
          }
          this.start = new Date().getTime();
        });
    });
  }

  addSection(title: string, content: string, userDefined: boolean){
    var sectionGroup = new FormGroup({
      title: new FormControl(title, userDefined ? Validators.required : Validators.nullValidator),
      content: new FormControl(content, Validators.nullValidator)
    });
    this.sections.push(sectionGroup);
  }

  addSectionButton(){
    var newSection = Section.CreateCustomSection();
    this.element.sections.push(newSection);

    this.save(this.element.sections, "sections");
    
    this.addSection(newSection.title, newSection.content, true);

  }

  deleteSection(index: number){
    this.sections.removeAt(index);
    this.element.sections.splice(index, 1);

    this.save(this.element.sections, "sections");
  }

  contentChange(field: string, index?: number){
    this.changes++;
    switch(field){
      case "name":
        this.element.name = this.elementForm.get("name")?.value;
        break;
      case "story":
        this.element.story = this.elementForm.get("story")?.value;
        break;
      case "sections":
        if (index == undefined) return;
        this.element.sections[index].title = this.sections.at(index).value["title"];
        this.element.sections[index].content = this.sections.at(index).value["content"];
        break;
      default:
        return;
    }

    if (this.changes >= 5 || (this.elapsedTime/1000 > 60*5 && this.changes > 0)){
      this.save(this.element, "all");
      this.changes = 0;
      this.start = new Date().getTime();
    }

  }

  showNameInputWithDelay(show: boolean): void {
    setTimeout(() => {this.inputShows.name = show;}, this.delay);
  }

  showStoryInputWithDelay(show: boolean): void {
    setTimeout(() => {this.inputShows.story = show;}, this.delay);
  }

  showSectionInputWithDelay(show: boolean, index: number): void {
    setTimeout(() => {this.inputShows.sectionTitles[index] = show;}, this.delay);
  }

  save(newData: any, field: string){
    this.service.UpdateElement(this.id, field, newData).subscribe(() => {
      console.log("Changes saved!");
    });
    
  }

  saveButton(){
    this.save(this.element, "all");
    this.start = new Date().getTime();
    this.changes = 0;
  }

  get elapsedTime(){
    var elapsed = new Date().getTime() - this.start;
    this.start = new Date().getTime();
    return elapsed;
  }
}
