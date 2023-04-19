export default function (context) {
  if (context.route.path === '/') {
    context.redirect('/dashboard')
  }
}
