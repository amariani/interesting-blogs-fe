import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />',() => {
  let component
  let incrementLikeMock
  let removeMock
  let blogObject

  beforeEach(() => {
    incrementLikeMock = jest.fn()
    removeMock = jest.fn()
    blogObject = {
      title:'Test Title',
      author:'Test Author',
      url:'www.testurl.com',
      likes:5,
      user:{
        id:'test-user-id',
        name:'test-user-name'
      },
    }

    component = render(
      <Blog
        blog={blogObject}
        incrementLike={() => incrementLikeMock(blogObject)}
        remove={() => removeMock(blogObject)}/>
    )

  })

  test('should show title and author by default', () => {
    expect(component.container).toHaveTextContent('Test Title')
    expect(component.container).toHaveTextContent('Test Author')
    expect(component.container).not.toHaveTextContent('Likes')
    expect(component.container).not.toHaveTextContent('url')
  })

  describe('with open details',() => {
    beforeEach(() => {
      const viewDetailsBtn = component.getByText('view')
      fireEvent.click(viewDetailsBtn)
    })

    test('should show url and likes when button is pressed', () => {
      expect(component.container).toHaveTextContent('Likes:')
      expect(component.container).toHaveTextContent('URL:')
    })

    test('should increment likes every time is pressed', () => {
      const likeBtn = component.container.querySelector('.likeBtn')
      fireEvent.click(likeBtn)
      fireEvent.click(likeBtn)

      expect(incrementLikeMock).toBeCalledTimes(2)
    })

    test('should call remove if confirmed modal', () => {
      window.confirm = jest.fn(() => true) // Simulate a yes to the confirmation modal

      const removeBtn = component.container.querySelector('.removeBtn')
      fireEvent.click(removeBtn)

      expect(removeMock).toBeCalledTimes(1)
    })

    test('should not call remove if not confirmed modal', () => {
      window.confirm = jest.fn(() => false) // Simulate a no/cancel to the confirmation modal

      const removeBtn = component.container.querySelector('.removeBtn')
      fireEvent.click(removeBtn)

      expect(removeMock).not.toBeCalled()
    })
  })
})