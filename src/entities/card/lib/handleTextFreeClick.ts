import React from 'react'

export const handleTextFreeClick = (
  event: React.MouseEvent<HTMLElement>,
  callback: () => void,
  excludedSelectors: string[] = []
) => {
  const { clientX, clientY, currentTarget } = event

  const elementsAtPoint = document.elementsFromPoint(clientX, clientY)

  // Filter out elements that are not children of the element with the handler (currentTarget)
  const childElementsAtPoint = elementsAtPoint.filter((element) => currentTarget.contains(element))

  // Check if any of the child elements contain a text node and aren't excluded
  const containsTextNode = childElementsAtPoint.some((element) => {
    // Check if the element matches any of the excluded selectors
    const isExcluded = excludedSelectors.some((selector) => element.matches(selector))

    if (isExcluded) {
      return false
    }

    // Check for text nodes within the element
    for (let node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        // Found a text node in a non-excluded element, so ignore the click
        return true
      }
    }

    return false
  })

  if (!containsTextNode) {
    callback()
  }
}
