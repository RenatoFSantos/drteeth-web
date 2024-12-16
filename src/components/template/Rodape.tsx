interface RodapeProps {
  company: string;
  version: string;
}

export default function Rodape(props: RodapeProps) {
  return (
    <div className="flex justify-end p-2 pr-5 bg-cyan-800 text-white text-sm">
      {props.company} - {props.version}
    </div>
  );
}
