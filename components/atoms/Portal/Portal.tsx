import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    name?: string;
    element?: string;
    children: ReactNode;
}

const Portal = ({ name, element = 'div', children }: PortalProps) => {
    const $element = useRef<HTMLElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if ($element?.current === null && typeof document !== 'undefined') {
            // check if portal already exists
            const $portal = document.getElementById('portal');

            // create wrapper for portal item
            const $div = document.createElement(element);
            $div.setAttribute('data-body-portal', name || '');

            // add newly created element to the ref
            $element.current = $div;

            // attach it to the portal or body
            if ($portal) {
                $portal.appendChild($element.current);
            } else {
                document.body.appendChild($element.current);
            }

            // set mounted
            setMounted(true);

            return () => {
                if ($portal) {
                    $portal.removeChild($element.current);
                } else {
                    document.body.removeChild($element.current);
                }
            };
        }
    }, [$element, setMounted, element, name]);

    return mounted ? createPortal(children, $element.current) : null;
};

export default Portal;
