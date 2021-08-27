import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />',() => {
  let component
  let createBlogMock

  beforeEach(() => {
    createBlogMock = jest.fn()

    component = render(
      <BlogForm
        createBlog={createBlogMock}/>
    )
  })

  test('should submit the correct info', () => {
    const form = component.container.querySelector('form')
    const titleInput = component.container.querySelector('input[name="title"]')
    const authorInput = component.container.querySelector('input[name="author"]')
    const urlInput = component.container.querySelector('input[name="url"]')
    const titleValue = 'Test Title'
    const authorValue = 'Test Author'
    const urlValue = 'www.testurl.com'

    fireEvent.change(titleInput,{
      target: {
        value: titleValue
      }
    })
    fireEvent.change(authorInput,{
      target: {
        value: authorValue
      }
    })
    fireEvent.change(urlInput,{
      target: {
        value: urlValue
      }
    })
    fireEvent.submit(form)

    expect(createBlogMock).toBeCalledTimes(1)

    // Values from called function
    const { title, author, url } = createBlogMock.mock.calls[0][0]

    expect(title).toBe(titleValue)
    expect(author).toBe(authorValue)
    expect(url).toBe(urlValue)
  })

})