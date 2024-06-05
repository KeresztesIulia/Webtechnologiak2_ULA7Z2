export class Section{
    title: string;
    content: string;
    userDefined: boolean;
    sectionDescription: string;

    constructor(title : string, content : string, userDefined : boolean, sectionDescription : string){
        this.title = title;
        this.content = content;
        this.userDefined = userDefined;
        this.sectionDescription = sectionDescription;
    }

    public static CreateCharacterPrompt(question : string) : Section{
        var promptText = "How would the character respond to this question/situation? Add as much context as needed. Feel free to duplicate a prompt for different contexts.";
        return new Section(question, "", false, promptText);
    }

    public static CreateCustomSection() : Section{
        var desc = "Give the section a name or enter a question, then write the details here!";
        return new Section("Custom section", "", true, desc);
    }
}