import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TSidebarItem } from '../SidebarItem';


const useKeyPressNavigation = (items: TSidebarItem[]) => {
  const router = useRouter();
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

  const flattenItems = (items: TSidebarItem[]): { keys: string[], url: string }[] => {
    let result: { keys: string[], url: string }[] = [];
    for (const item of items) {
      if (item.shortcut) {
        result.push({ keys: item.shortcut.split('+').map(k => k.trim().toLowerCase()), url: item.href });
      }
      if (item.children) {
        result = result.concat(flattenItems(item.children));
      }
    }
    return result;
  };

  const isInputFocused = () => {
    const activeElement = document.activeElement  as HTMLElement;;
    return activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable);
  };

  useEffect(() => {
    const keyUrlPairs = flattenItems(items);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isInputFocused()) {
        setKeysPressed(prevKeys => new Set(prevKeys).add(event.key.toLowerCase()));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeysPressed(prevKeys => {
        const newKeys = new Set(prevKeys);
        newKeys.delete(event.key.toLowerCase());
        return newKeys;
      });
    };

    const handleKeyPress = () => {
      if (!isInputFocused()) {
        for (const pair of keyUrlPairs) {
          const allKeysPressed = pair.keys.every(key => keysPressed.has(key));
          if (allKeysPressed) {
            router.push(pair.url);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [items, keysPressed, router]);

  return null;
};

export default useKeyPressNavigation;
