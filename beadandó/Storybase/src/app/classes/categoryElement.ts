import { Section } from "./section";

export class CategoryElement{
    _id? : string;
    category: string;
    user: string;
    name: string;
    story: string;
    sections: Section[];

    constructor(categoryName : string, name : string, user : string){
        this.category = categoryName;
        this.name = name;
        this.user = user;
        this.story = "unassigned";
        

        var sectionDescription = "Give a general description with the most important details! This doesn't need to be very long - everything more detailed can have it's own separate sections!";
        this.sections = [new Section("General description", "", true, sectionDescription)];
    }

    public static CreateCharacter(user : string) : CategoryElement {
        var character : CategoryElement = new CategoryElement("character", "Unnamed Character", user);
        character.sections[0].userDefined = false;
        var sections = {
            "Species" : "What species is this character? The most important species features can also be added here, but it's recommended to create a separate page for the species in general under the 'Creature' category to have a more detailed description.",
            "Appearance" : "What does this character look like? Give as much detail as possible. Think about how this relates to the character's life.",
            "Personality" : "What is the character like? What are their defining traits? Do any of these change during the story?",
            "Behaviour" : "Describe how this character usually acts. How does this change under different circumstances (stress, grief, excitement etc.)? How likely is this character to be affected by what's happening around them? Give as much detail as you'd like, but keep in mind that this is a general description section. For behaviour in specific situations and moods it's recommended you make separate sections!",
            "Likes" : "What are some of the things the character really likes in life? This can either be a simple list or something more detailed. Why does the character like these things? Do they know the reason? Is there an order of importance among these? Would the character have a hard time giving any of these up if it felt absolutely necessary? It might be a good idea to create a new section for the most important ones!",
            "Dislikes" : "What would this character rather avoid in life? This can either be a simple list or something more detailed. Why does the character dislike these things? Do they know the reason? What would they be willing to endure if they had to? Is there anything the character would absolutely never accept/endure, or just under extreme circumstances? For specific situations or the most important things on the list, it's recommended to make a new section!",
            "Firm beliefs" : "What does this character believe to be a truth of life? What do they believe is the right thing to do? Why do they believe this? Would the character be willing to sacrifice some of these values for something else? Which of these beliefs would they hold on to until the end, under any circumstances? It's recommended to create a separate section to show how any of these beliefs change under specific situations.",
            "Backstory" : "What was the character's life like before the beginning of the story? What made them the way they are now? How much do they remember of this past? Is there anything that they actively think about? It's recommended to make a list of the most important events along the way in the 'Important events' section, and write about those in more detail in sections of their own afterwards!",
            "Important events" : "An undetailed list of the most important events in the character's life, both from their past and during the story. These can be events special to the character, or some that changed their life without the character realizing, etc. Anything can be written here if it has some kind of important impact on the character's life. It's recommended to have separate sections detailing all of these events!"
        };
        for (var sectionTitle in sections){
            character.sections.push(new Section(sectionTitle, "", false, sections[sectionTitle as keyof typeof sections]));
        }

        // var prompts = ["prompt1, prompt2"];
        // for (var prompt in prompts){
        //     character.sections.push(Section.CreateCharacterPrompt(prompt));
        // }

        return character;
    }

    public static CreateCreature(user : string) : CategoryElement{
        var creature : CategoryElement = new CategoryElement("creature", "Unnamed Creature", user);
        creature.sections[0].userDefined = false;
        var sections = {
            "Appearance" : "What do these creatures look like? What are some of their defining features? What are they most recognizable by, visually?",
            "Habitat" : "What kind of places do they live in? What is most suited for their needs? How much variation can they survive? What kind of environments would be deadly/unlivable for them?",
            "Lifestyle" : "How does this species live? Do members live together, in groups, or separately? Are they territorial? What do they eat? Are they predators?",
            "Intelligence" : "Is this an intelligent species? What communication system do they have? Do they have some kind of civilization?",
            "Variations/Mutations" : "Are there mutations or other branches of evolution for these creatures? Would they still be recognizable as part of this species, or are there considered separate species? What caused the differences? How well do these different branches get along with each other?",
            "Interaction with other species" : "What other species are they close to? Who's above them in the food chain? Do they have a symbiotic relationship with any other species? Are there any common rivalries with other species? Anything specific or detailed and important can have it's own section.",
            "Others' attitude towards these creatures" : "How do (other) intelligent species think of these creatures? If these creatures are not intelligent, are they used for anything by intelligent ones (like transport, travel, etc.)? Are they hunted/sought for for anything? Do others have beliefs centered around these creatures? Do they revere them as higher/special beings? Do they have superstitions about them? Myths, legends, bedtime stories? Are they known to be real? Specific stories and myths can have their separate sections!",
            "Role/Appearance in the story" : "How will they appear in the story? What is their importance? Will a member of this species appear as a character? Will they only be mentioned?"
        };
        for (var sectionTitle in sections){
            creature.sections.push(new Section(sectionTitle, "", false, sections[sectionTitle as keyof typeof sections]));
        }

        return creature;
    }

    public static CreateLocation(user : string) : CategoryElement{
        var location : CategoryElement = new CategoryElement("location", "Unnamed Location", user);
        location.sections[0].userDefined = false;
        var sections = {
            "Historical importance" : "Did something important happen in this location that is part of history? Did someone important live here? Is the story passed on as it happened, or has it been modified in some way?",
            "Landmarks" : "What landmarks can be found there? What would this place be most recognized by?",
            "Relations with other places" : "Are there any other places that this location is related to? Any rivals, allies, places that people often travel from to get here, etc.?",
            "Role/Appearance in the story" : "How will the location appear in the story? Will characters travel here? Do they only pass through? Is it only mentioned? Is it an important place?"
        };
        for (var sectionTitle in sections){
            location.sections.push(new Section(sectionTitle, "", false, sections[sectionTitle as keyof typeof sections]));
        }

        return location;
    }
}


// public static CreateCharacterPrompt(question : string) : Section{
//     var promptText = "How would the character respond to this question/situation? Add as much context as needed. Feel free to duplicate a prompt for different contexts."
//     return new Section(question, "", false, promptText);
// }