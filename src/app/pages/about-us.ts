import Main from '../components/main';
import { createElement } from '../components/utils';
import { teammates } from '../components/constants';

class AboutUS {
  public drawAboutUs(): HTMLDivElement {
    const aboutUs = createElement('div', ['about-us', 'main__wrapper', 'main__wrapper_thin']) as HTMLDivElement;
    const title = createElement('h2', ['about-us__title'], `MEET OUR TEAM`) as HTMLDivElement;
    const decorator = Main.createTitleDecorator() as HTMLDivElement;
    const commonInfoWrapper = createElement('div', ['about-us__common']) as HTMLDivElement;
    const commonParagWrapper = createElement(
      'div',
      ['about-us__common-info'],
      `
    <p class="paragraph">We're an optimistic and gratitude-filled group of remote workers dedicated to creating a product people will use and love.</p>
    <p class="paragraph">We desire to be better every day and know that improvement can be found in small changes. Daily communication and competent distribution of tasks allowed each teammate to work on all types of tasks - from creating page layouts to working with API.</p>
    <p class="paragraph">We appreciate our teammates for the best teamwork ever. We are grateful to our cool mentors for their responsiveness and valuable advice and RS School for the training.</p>`,
    );
    const imgBlock = createElement('div', ['about-us__img-contaiter']) as HTMLDivElement;
    const commonImg = createElement('div', ['about-us__common-img']) as HTMLDivElement;
    const rsLink = createElement('a', ['rs-school-logo'], '', {
      target: 'blank',
      href: 'https://rs.school/',
    }) as HTMLLinkElement;
    const content = createElement('div', ['about-us__content']) as HTMLDivElement;
    const contributions = this.addСontributions();

    imgBlock.append(commonImg, rsLink);
    commonInfoWrapper.append(commonParagWrapper, imgBlock);
    content.append(commonInfoWrapper);
    teammates.forEach((teammate, idx) => {
      content.append(this.drawTeammate(teammate, idx));
    });
    aboutUs.append(title, decorator, content, contributions);
    return aboutUs;
  }

  private drawTeammate(teammate: { [key: string]: string }, idx: number): HTMLDivElement {
    const wrapper = createElement('div', ['teammate-block']) as HTMLDivElement;

    const imgBlock = createElement('div', ['teammate_img-block']) as HTMLDivElement;
    const img = createElement('div', ['teammate_img', `teammate_img-${idx}`]) as HTMLDivElement;
    const socials = createElement('div', ['teammate_socials']) as HTMLDivElement;
    const github = createElement('a', ['teammate_socials-github'], '', {
      href: `${teammate.github}`,
      target: 'blank',
    }) as HTMLLinkElement;
    const telegram = createElement('a', ['teammate_socials-telegram'], '', {
      href: `${teammate.telegram}`,
      target: 'blank',
    }) as HTMLLinkElement;

    socials.append(github, telegram);
    imgBlock.append(img, socials);

    const infoBlock = createElement('div', ['teammate_info-block']) as HTMLDivElement;
    const teammateName = createElement('div', ['teammate_info-name'], `${teammate.name}`) as HTMLDivElement;
    const teammateRole = createElement('div', ['teammate_info-role'], `${teammate.role}`) as HTMLDivElement;
    const teammateBio = createElement('div', ['teammate_info-bio', 'paragraph'], `${teammate.bio}`) as HTMLDivElement;

    infoBlock.append(teammateName, teammateRole, teammateBio);

    wrapper.append(imgBlock, infoBlock);
    return wrapper;
  }

  private addСontributions(): HTMLDivElement {
    const contributions = createElement(
      'div',
      ['about-us__contributions'],
      `
    <h3>Contributions:</h3>
    <div class="about-us__contributions-grid">
      <div class="about-us__contributions-item"><h4>Kristina</h4></div>
      <div class="about-us__contributions-item"><h4>Natalia</h4></div>
      <div class="about-us__contributions-item"><h4>Irina</h4></div>
      <div class="about-us__contributions-item">Repository setup</div>
      <div class="about-us__contributions-item">Development environment configuration</div>
      <div class="about-us__contributions-item">Commercetools configuration</div>
      <div class="about-us__contributions-item">Routing</div>
      <div class="about-us__contributions-item">Login and registration layout and validation</div>
      <div class="about-us__contributions-item">Login and registration integration with Commercetools</div>
      <div class="about-us__contributions-item">Catalog page</div>
      <div class="about-us__contributions-item">User profile page</div>
      <div class="about-us__contributions-item">Product page</div>
      <div class="about-us__contributions-item">Catalog enhancements</div>
      <div class="about-us__contributions-item">Basket page</div>
      <div class="about-us__contributions-item">About us page</div>
    </div>
    `,
    ) as HTMLDivElement;

    return contributions;
  }
}

export default AboutUS;
