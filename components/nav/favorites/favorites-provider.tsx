"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TSidebarItem } from "../SidebarItem";
import { useLocalStorage } from "usehooks-ts";

export type Path = Omit<TSidebarItem, "children"> & { id: string };

export type Folder = {
  id: string;
  label: string;
  children: Path[];
};

type FavoritesContextType = {
  favorites: (Folder | Path)[];
  editFolderId: string | null;
  setEditFolderId: Dispatch<SetStateAction<string | null>>;
  onLabelValueChange: (id: string, value: string) => void;
  setFavorites: Dispatch<SetStateAction<(Folder | Path)[]>>;
  insertFolder: (label: string) => void;
  insertPath: (path: Path) => void;
  isPathFavorited: (path: string) => boolean;
  deletePathByHref: (href: string) => void;
  deleteFolderById: (id: string) => void;
  findItemById: (id: string) => Folder | Path | undefined;
  findParentById: (id: string) => Folder | undefined;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  editFolderId: null,
  setFavorites: () => {},
  setEditFolderId: () => {},
  onLabelValueChange: () => {},
  insertFolder: () => {},
  insertPath: () => {},
  isPathFavorited: () => false,
  deletePathByHref: () => {},
  deleteFolderById: () => {},
  findItemById: () => undefined,
  findParentById: () => undefined,
});

export const FavoritesProvider = (props: PropsWithChildren) => {
  const [favorites, setFavorites] = useLocalStorage<
    FavoritesContextType["favorites"]
  >("favorites", [], { initializeWithValue: false });

  const [editFolderId, setEditFolderId] = useState<string | null>(null);

  const insertFolder = (label: string) => {
    const folder: Folder = {
      label: label,
      children: [],
      id: generateRandomString(),
    };
    setFavorites((prev) => [folder, ...prev]);
    setEditFolderId(folder.id);
  };

  const onLabelValueChange = (id: string, value: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((item) => {
        if (isFolder(item) && item.id === id) {
          return { ...item, label: value };
        }
        return item;
      })
    );
  };

  const isPathFavorited = useCallback(
    (path: string): boolean => {
      return favorites.some((item) => {
        if (isPath(item) && item.href === path) {
          return true;
        }
        if (isFolder(item)) {
          return item.children.some((child) => child?.href === path);
        }
        return false;
      });
    },
    [favorites]
  );

  const deletePathByHref = (href: string) => {
    setFavorites(
      (prevFavorites) =>
        prevFavorites
          .map((item) => {
            if (isPath(item)) {
              return item.href === href ? null : item;
            }
            if (isFolder(item)) {
              const updatedChildren = item.children.filter(
                (child) => child.href !== href
              );
              return { ...item, children: updatedChildren };
            }
            return item;
          })
          .filter((item) => item !== null) as (Folder | Path)[]
    );
  };

  const deleteFolderById = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => !(isFolder(item) && item.id === id))
    );
  };

  const insertPath = (path: TSidebarItem) => {
    setFavorites((prev) => [
      { ...path, id: generateRandomString() } as Path,
      ...prev,
    ]);
  };

  const findParentById = (id: string): Folder | undefined => {
    const findRecursive = (
      items: (Folder | Path)[],
      parent: Folder | undefined
    ): Folder | undefined => {
      for (const item of items) {
        if (item.id === id) {
          return parent;
        }
        if (isFolder(item)) {
          const found = findRecursive(item.children, item);
          if (found) {
            return found;
          }
        }
      }
      return undefined;
    };
    return findRecursive(favorites, undefined);
  };

  const findItemById = (id?: string): Folder | Path | undefined => {
    if (!id) return undefined;
    const findRecursive = (
      items: (Folder | Path)[],
      id: string
    ): Folder | Path | undefined => {
      for (const item of items) {
        if (item.id === id) {
          return item;
        }
        if (isFolder(item)) {
          const found = findRecursive(item.children, id);
          if (found) {
            return found;
          }
        }
      }
      return undefined;
    };
    return findRecursive(favorites, id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        editFolderId,
        setEditFolderId,
        setFavorites,
        insertFolder,
        insertPath,
        onLabelValueChange,
        isPathFavorited,
        deletePathByHref,
        deleteFolderById,
        findItemById,
        findParentById,
      }}
    >
      {props.children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const isFolder = (item: Folder | Path): item is Folder => {
  return typeof (item as Folder).label === "string";
};

export const isPath = (item: Folder | Path): item is Path => {
  return typeof (item as Path).href === "string";
};

const generateRandomString = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
};
