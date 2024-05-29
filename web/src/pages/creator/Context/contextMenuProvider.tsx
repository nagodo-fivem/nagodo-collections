import { createContext, useContext } from "react";

const ContextMenuContext = createContext<any>(null);

interface ContextMenuProviderProps {
    value: any;
    children: React.ReactNode;
}

export const ContextMenuProvider = ({value, children}: ContextMenuProviderProps) => {
    return <ContextMenuContext.Provider value={value}>{children}</ContextMenuContext.Provider>
}

export const useParent = () => {
    return useContext(ContextMenuContext);
}