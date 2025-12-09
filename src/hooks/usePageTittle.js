import { useEffect } from "react"
import { useLocation } from "react-router-dom"


export const usePageTittle = () => {
          const pathName = useLocation().pathname
          const url = `https://neyah-adventure.netlify.app${pathName}`
                
        useEffect(()=>{

          // Create or update the canonical link element
          let link = document.querySelector("link[rel='canonical']");
          if(!link){
            link = document.createElement('link');
            link.rel = "canonical";
            document.head.appendChild(link);
          }
          link.href = url
          
          // Optional cleanup: remove the link when component unmounts
          return () => {
            if (link.parentNode) {
              link.parentNode.removeChild(link);
            }
          };
        },[pathName])
}