export async function createUserResponse(response: Response): Promise<string> {
  if (!response.ok) {
    if (response.status === 400) {
      return "Email is taken.";
    } else if (response.status === 500) {
      return "Please try again.";
    } else {
      return " ";
    }
  }
  return " ";
}
