import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../service';
import { MaterialModule } from '../material.module';
import { CategoryElement } from '../classes/categoryElement';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-elements',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './list-elements.component.html',
  styleUrl: './list-elements.component.css'
})
export class ListElementsComponent implements OnInit {
  baseURL = "http://localhost:4200";
  texts = {
    "characters" : [
      "Characters",
      "Humans, animals, members of any made-up species or even non-intelligent or non-civilized creatures. Any individual that has some kind of role or significance in the story you want to tell!",
      "character"
    ],
    "locations" : [
      "Locations",
      "Villages, towns, buildings; countries and realms; ruins, forests, lakes and cliffs. Any place, big or small, that has some kind of role or significance in the story you want to tell!",
      "location"
    ],
    "creatures" : [
      "Creatures",
      "Races, species and all kinds of creatures! Can be made-up or existing, humanoid or entirely different, intelligent and civilized or not. Any kind of creature that, as a whole, or an individual of which, plays a role in the story you want to tell! (Important to note: individuals of any species or race should be created under the 'characters' category! This category is solely for the description of entire groups/species!)",
      "creature"
    ],
    "other" : [
      "Other",
      "There are only so many predefined categories to be found on the website (that is, not too many right now). Everything else, from plotlines and events to items and magic systems can be defined here, with fully customizable sections! (Note, however, that templates for any of these categories cannot be created, so for any two elements of the same, user-defined category, you will have to manually add the same sections again, if they are relevant for more elements.)",
      "other"
    ]
  };
  categoryInfo = {
    "characters" : ["character"],
    "locations" : ["location"],
    "creatures" : ["creature"],
    "other" : ["other"]
  };

  type: string = "";
  title: string = "";
  description: string = "";

  categoryName: string = "";
  stories: string[] = [];
  elements: CategoryElement[] = [];

  storyFilter = new FormGroup({
    storyFilter: new FormControl("all", Validators.required)
  });

  constructor(private route: ActivatedRoute, private router : Router, private service : Service){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) =>{
        this.type = params['category'];
        this.title = this.texts[this.type as keyof typeof this.texts][0];
        this.description = this.texts[this.type as keyof typeof this.texts][1];
        
        this.categoryName = this.categoryInfo[this.type as keyof typeof this.categoryInfo][0];
        this.service.GetStories(this.categoryName).subscribe((data) =>{
          this.stories = data;
        });
        this.filterElements("all");
    });
  }

  filterElements(storyFilter: string): void{
    this.service.GetElements(this.categoryName, storyFilter).subscribe((data) =>{
      this.elements = data;
    });
  }

  addElement() : void{
    this.service.CreateElement(this.categoryName).subscribe((data) => {
      this.router.navigateByUrl(`${this.categoryName}/${data}`);
    });
  }

  editElement(index: number) : void{
    this.router.navigateByUrl(`${this.categoryName}/${this.elements[index]._id}`);
  }

  deleteElement(index: number) : void{
    this.service.DeleteElement(this.elements[index]._id ?? "").subscribe(() => {
      console.log("Deleted successfully!");
    });
    this.elements.splice(index,1);
  }

  get selectValue(){
    return this.storyFilter.value['storyFilter'] ?? "all";
  }

}
