export class CyAppSeeds {
  resetTasks() {
    return this._request('GET', 'tasks')
      .then((response) => response.tasks)
      .then((tasks) => {
        if (tasks.length) {
          return this.deleteTasks(tasks);
        }
      });
  }

  deleteTasks(tasks, index = 0) {
    const task = tasks[index];

    return this._request('DELETE', `tasks/${task.id}`)
      .then(() => index < tasks.length - 1 ? this.deleteTasks(tasks, index + 1) : null);
  }

  _request(method, path, body = {}) {
    const url = `http://localhost:3000/api/${path}`;

    return cy.request({
      method,
      url,
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.body);
  }
}
