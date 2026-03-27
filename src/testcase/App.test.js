import { render, screen, fireEvent } from "@testing-library/react";
import Todos from "../Todos";

describe("Todo App Tests", () => {

  test("renders heading", () => {
    render(<Todos />);
    const heading = screen.getByText("Todo List");
    expect(heading).toBeInTheDocument();
  });

  test("renders input and button", () => {
    render(<Todos />);
    
    const input = screen.getByPlaceholderText("Add task");
    const button = screen.getByText("Add");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("input is an input tag", () => {
    render(<Todos />);
    const input = screen.getByPlaceholderText("Add task");
    expect(input.tagName).toBe("INPUT");
  });

  test("button is a button tag", () => {
    render(<Todos />);
    const button = screen.getByText("Add");
    expect(button.tagName).toBe("BUTTON");
  });

  test("adds a todo item", () => {
    render(<Todos />);

    const input = screen.getByPlaceholderText("Add task");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Learn React" } });
    fireEvent.click(button);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
  });

  test("todo item appears inside list (li)", () => {
    render(<Todos />);

    const input = screen.getByPlaceholderText("Add task");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "List Test" } });
    fireEvent.click(button);

    const item = screen.getByText("List Test");
    expect(item.closest("li")).toBeInTheDocument();
  });

  test("toggles a todo item", () => {
    render(<Todos />);

    const input = screen.getByPlaceholderText("Add task");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Test Toggle" } });
    fireEvent.click(button);

    const todo = screen.getByText("Test Toggle");
    fireEvent.click(todo);

    expect(todo).toHaveStyle("text-decoration: line-through");
  });

  test("delete button exists", () => {
    render(<Todos />);

    const input = screen.getByPlaceholderText("Add task");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Delete Check" } });
    fireEvent.click(button);

    const deleteBtn = screen.getByText("❌");
    expect(deleteBtn.tagName).toBe("BUTTON");
  });

  test("deletes a todo item", () => {
    render(<Todos />);

    const input = screen.getByPlaceholderText("Add task");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Delete Me" } });
    fireEvent.click(button);

    const deleteBtn = screen.getByText("❌");
    fireEvent.click(deleteBtn);

    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
  });

});
