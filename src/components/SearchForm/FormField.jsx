import { Controller } from "react-hook-form";

// eslint-disable-next-line no-unused-vars
function FormField({ control, label, name, Component }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-300">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { ...field } }) => {
          return <Component field={field} control={control} />;
        }}
      />
    </div>
  );
}

export default FormField;
