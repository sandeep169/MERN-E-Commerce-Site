<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <title>URL Shortener</title>
</head>
<body>
  <div class="container">
    <br>
    <center><h1>URL Shortener</h1></center>
    <form action="/urls" method="POST" class="my-4 form-inline">
        <label for="fullUrl" class="sr-only">Url</label>
        <input required placeholder="Enter URL" type="url" name="fullUrl" id="fullUrl" class="form-control col mr-2">
        <button class="btn btn-success" type="submit">Shrink</button>
    </form>

    <br>

    <table class="table table-striped">         <!-- </table> table-bordered"> -->
      <thead class="thead-dark">
        <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Visits</th>
        </tr>
      </thead>
      <tbody>
        <% urls.forEach(u => { %>
            <tr>
            <td class="text-break" style="border-right: 1px solid lightgrey;"><a href="<%= u.full %>"><%= u.full %></a></td>
            <td class="font-italic" style="border-right: 1px solid lightgrey;"><a href="<%= u.short %>">http://localhost:5000/<%= u.short %></a></td>
            <td class="text-center"><%= u.clicks %></td>
            </tr>
        <% }) %>
      </tbody>
    </table>
  </div>
</body>
</html>
