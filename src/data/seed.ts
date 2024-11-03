import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

import { Patient } from "./schema";

const tasks = Array.from(
  { length: 100 },
  () =>
    ({
      id: `P-${faker.string.ulid()}`,
      name: faker.person.fullName(),
      age: faker.number.int({ min: 1, max: 100 }),
      sex: faker.helpers.arrayElement(["female", "male"]),
    } as Patient)
);

fs.writeFileSync(
  path.join(__dirname, "patients.json"),
  JSON.stringify(tasks, null, 2)
);

console.log("✅ Patients data generated.");
