import Label from './Label';
import Input from './Input';

function FormControl({
   children,
   title,
   subtitle,
   placeholder,
   id,
   type,
   value,
}) {
   if (children) {
      return <div className="mb-3">{children}</div>;
   }
   return (
      <div className="mb-3">
         <Label title={title} subtitle={subtitle} id={id} />
         <Input type={type} id={id} placeholder={placeholder} value={value} />
      </div>
   );
}

export default FormControl;
