import { createHash } from "crypto";

const salt = "4t897y2er7b8f1342hg890df21";

const getHash = (str: string) => {
  const shasum = createHash("md5");

  const pkg = {
    p: str,
    salt,
  };

  shasum.update(JSON.stringify(pkg));
  return shasum.digest("hex");
};

export default getHash