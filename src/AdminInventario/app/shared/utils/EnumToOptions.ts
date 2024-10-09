export const mapEnumToOptions = (enumObj: { [key: string]: string }) => {
    return Object.entries(enumObj).map(([key, value]) => ({
      value,
      label: value,
    }));
  };
  