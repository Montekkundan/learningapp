function omit<T extends object>(obj: T, property: keyof T | (keyof T)[]) {
        if (Array.isArray(property)) {
            const entries = Object.entries(obj).filter((item) => {
                const [key] = item;
    
                return !property.includes(key as keyof T);
            });
    
            return Object.fromEntries(entries) as Pick<T, Exclude<keyof T, typeof property[number]>>;
        }
    
        const { [property]: unused, ...rest } = obj;
    
        return rest as Pick<T, Exclude<keyof T, typeof property>>;
    }
  
export default omit;

