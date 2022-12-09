declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

type Todo = {
  id: number;
  name: string;
  description: string;
  checked: boolean;
};
