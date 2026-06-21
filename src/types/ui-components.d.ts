declare module "@/components/ui/accordion" {
  import * as React from "react";

  export const Accordion: React.ComponentType<any>;
  export const AccordionItem: React.ComponentType<any>;
  export const AccordionTrigger: React.ComponentType<any>;
  export const AccordionContent: React.ComponentType<any>;
}

declare module "@/components/ui/input" {
  import * as React from "react";

  export const Input: React.ForwardRefExoticComponent<
    React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>
  >;
}

declare module "@/components/ui/label" {
  import * as React from "react";

  export const Label: React.ForwardRefExoticComponent<
    React.LabelHTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>
  >;
}

declare module "@/components/ui/textarea" {
  import * as React from "react";

  export const Textarea: React.ForwardRefExoticComponent<
    React.TextareaHTMLAttributes<HTMLTextAreaElement> & React.RefAttributes<HTMLTextAreaElement>
  >;
}
