import fs from "fs";
import { Meteor } from "meteor/meteor";
import { SSR } from "meteor/meteorhacks:ssr";

export default function (name, data) {
  try {
    SSR.compileTemplate(
      name,
      fs.readFileSync(`assets/app/email-templates/${name}.html`, "utf8")
    );
    return SSR.render(name, data);
  } catch (exception) {
    throw new Meteor.Error("500", exception);
  }
}
