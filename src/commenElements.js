export const header = (() => {
  const getHeader = (title = 'title') => {
    const headerElement = document.createElement('header');
    const logoLink = document.createElement('a');
    logoLink.href = '#';
    const h1 = document.createElement('h1');
    h1.textContent = title;

    logoLink.append(h1);

    headerElement.append(logoLink);
    return headerElement;
  };
  return { getHeader };
})();

export const main = (() => document.createElement('main'))();

export const footer = (() => {
  const footerElement = document.createElement('footer');

  const footerText = document.createElement('p');
  footerText.textContent = 'made by: ';

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/RobbeVanslambrouck';
  githubLink.target = '_blank';
  githubLink.textContent = ' robbe vanslambrouck';

  const githubLogo = document.createElement('i');
  githubLogo.className = 'fa-brands fa-github';
  githubLink.prepend(githubLogo);

  footerText.append(githubLink);

  footerElement.append(footerText);
  return footerElement;
})();
