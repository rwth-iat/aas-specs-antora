# Antora Meta-Repository - Asset Administration Shell (AAS) 

This is repository contains the structure for building the documentation website for the AAS by [the Industrial Digital Twin Association](https://industrialdigitaltwin.org). This includes the means to generate it on demand by compiling and assembling the respective content from numerous remote repositories and sources written in ascii-doc using [Antora](https://antora.org/).

## Sources
This repository does not contain the website's content itself; instead, it coordinates the assembly of content from external sources, including:
- [Part 1: Metamodel](https://github.com/admin-shell-io/aas-specs/)
- [Part 2: API Specifications](https://github.com/admin-shell-io/aas-specs-api)
- [Part 3a: IEC 61360](https://github.com/admin-shell-io/aas-specs-iec61360)
- [Part 5: AASX Package Format](https://github.com/admin-shell-io/aas-specs-aasx)

Detailed information about source management is available in the [Antora playbook](antora-playbook.yml).

## User-Interface
The user interface for the documentation is maintained separately in [aas-specs-antora-ui](https://github.com/admin-shell-io/aas-specs-antora-ui). 

## Building the Documentation
The documentation is dynamically generated
- Automatically every X-hours or
- Manually by authorized individuals
  - To build and deploy the documentation website manually:
    - Go to action [Publish Website](https://github.com/admin-shell-io/aas-specs-antora/actions/workflows/publish.yml)
    - Trigger the action by clicking on "Run Workflow" in the right corner

## Contribution Guidelines
Contributors should test changes locally before pushing to remote repositories to maintain the integrity of the documentation. If local testing is not feasible, or if you require assistance, please [open an issue](https://github.com/admin-shell-io/aas-specs-antora/issues) for detailed guidance or to request manual build privileges. While direct testing on the live website is possible, it's discouraged due to potential complications. The site is also automatically updated several times a day, allowing for a natural review of changes.

## Usage
If you wish the set up this environment locally to generate the collective documentation or edit the due process to alter the results in the direction of your needs and desires, this section covers the steps and requirements in the process and aims to guide you broadly to ease the procedure. If you require more assistance or proper documentation along the way, you should make use of the official [Antora documentation](https://docs.antora.org/antora/latest/).

### Prerequisites
Before proceeding, you are required to have the latest [Node.js LTS release](https://nodejs.org/en/download) installed on your Linux, Windows, or macOS machine. You can then follow the steps [here](https://docs.antora.org/antora/latest/install/install-antora/) to install Antora and set it up.

### Building Locally

#### Prerequisites and Preliminary Steps
* A prerequisite is having the latest Node.js LTS release on your Linux, Windows, or macOS machine. For reproducability and ease of use, please use Linux, MacOS or another Unix-like system. If you are on windows, consider using WSL. Directly running on windows might prove more difficult and tedious, since no package manager will be available for any of the following steps. See [here](https://nodejs.org/en/download/package-manager) for instructions.

* In order to locally build the documentation website on your own, you have to make sure you have Antora command line interface (CLI) and the official Antora site generator installed. See [here](https://docs.antora.org/antora/latest/install/install-antora/) for instructions. You may skip this step to install npm packages after cloning the repository.

* In the following steps, Ruby will be required. Install ruby on your system and configure it for use for a non-root user. See [here](https://www.ruby-lang.org/en/downloads/) for instructions.

* Rendering puml files into images for pdf files will require Graphviz to be installed on the system. If you are on linux, your package manager most probably has it and you can easily install it.  See [here](https://www.ruby-lang.org/en/downloads/) for instructions.

* Another requirement for puml images on the website is having java on the system. See [here](https://www.java.com/en/) for instructions.

* All of the requirements above are easily solved with a one-liner command on a tradition linux system. To be consistent with the server, try using Ubuntu in a VM.

#### Building Process

* You can then continue with cloning this repository.

```
git clone git@github.com:rwth-iat/aas-specs-antora.git
```

* Assuming your system already satisfies the requirements mentioned, you can install the dependencies of this repository.
```
npm install
```

* Now, you should be able to run Antora locally.
```
npx antora antora-playbook.yml
```

* The website should generate. Pdf files may not generate at first. To resolve this issue
```
gem install bundler
bundle install
```

* After this step, pdf files should generate too. If there are errors, make sure you satisfy all the requirements in the previous subsection.

* Everything will be under ```/build```. This directory contains the website that is deployed to GitHub pages.

#### The User Interface

* The repository for the UI can be found in the playbook file. You can locally build a preview of the UI or build the release file yourself to test around. Instructions regarding this can be found in the UI repository.

#### The PDF Files
We use the antora/pdf-extension to generate PDF files alongside the web pages. We use our own [PDF Theme](pdf-theme.yml) to define our style and structure. The configuration file for the PDF generation process is the [antora-assembler.yml](antora-assembler.yml).

The cover pages of these PDF files are not readily provided images. Tho, we use an [image on our cover pages](cover.pdf) as the background. Our goal is to embed as little as possible as part of this image. Document properties like the title, subtitle, date, author, etc. are displayed as text on top of this background image.

We use a custom extension written in ruby. This can be seen in the file [extended.rb](extended.rb). This file is taken from the extension examples from the asciidoctor-pdf repository. If numbering of paragraphs is no longer required, this can be disabled by editing the [antora-assembler.yml](antora-assembler.yml). Deleting the option ```-r ./extended.rb``` after the command will disable this extension. Numbering of paragraphs is mainly for debug and review purposes.

#### Schema Overview

##### Key Concepts and Components
* **AsciiDoc:** A lightweight markup language used for writing documentation. It allows you to create structured documents with headings, lists, tables, and more.

* **Asciidoctor:** A Ruby-based processor that converts AsciiDoc files into various formats, such as HTML and PDF. It interprets the AsciiDoc markup and generates the final output.

* **Asciidoctor PDF:** An extension of Asciidoctor that specifically converts AsciiDoc files into PDF format. It allows you to create printable versions of your documentation.

* **Antora Assembler:** The component of Antora (as an extension) that assembles documentation from multiple sources (modules) into a cohesive PDF document or documents. It organizes the content, applies themes, and generates the final output.

* **Deployment to GitHub Pages:** A method to host your generated documentation on GitHub Pages, making it accessible to users via a web URL.

##### Workflow Overview

* **Writing Documentation:** Authors write documentation in AsciiDoc format, organizing it into modules (e.g., user guides, API references).

* **Processing with Antora:** When you run Antora, it uses the Antora assembler to gather all the AsciiDoc files from the specified modules. It processes these files, applying any themes or configurations defined in the Antora playbook (a YAML file that describes the site structure).

* **Generating Output:** The assembler calls Asciidoctor to convert the AsciiDoc files into HTML. If you want to generate PDFs, it will also call Asciidoctor PDF to create those files.

* **Building the Site:** The output (HTML and/or PDF) is organized into a structured site, ready for deployment.

* **Deploying to GitHub Pages:** The generated HTML files can be pushed to a GitHub repository configured for GitHub Pages. This makes the documentation available online, where users can access it through a web browser.

This workflow allows teams to maintain and publish documentation efficiently, ensuring that it is always up-to-date and accessible to users.

#### The Structure and Schema in Diagrams

In order to get a more comprehensive look at the structure of the Antora project, you can check the presentation slides and script for the talk [“Antora: Documentation Sites for Software Teams”](https://gitlab.com/opendevise/talks/docs-sites-for-software-teams), which includes some very explanatory diagrams. The following are diagrams that help illustrate the underlyaing scheme.

![Structure_1](https://devoxxuk-2019--opendevise-talks-docs-sites-for-software-teams.netlify.app/images/antora-pipeline-1.svg)

See [Slide 19 from “Antora: Documentation Sites for Software Teams”](https://devoxxuk-2019--opendevise-talks-docs-sites-for-software-teams.netlify.app/#19)

![Structure_2](https://devoxxuk-2019--opendevise-talks-docs-sites-for-software-teams.netlify.app/images/antora-pipeline-2.svg)

See [Slide 21 from “Antora: Documentation Sites for Software Teams”](https://devoxxuk-2019--opendevise-talks-docs-sites-for-software-teams.netlify.app/#21)

![Structure_3](https://devoxxuk-2019--opendevise-talks-docs-sites-for-software-teams.netlify.app/images/docs-project-structure.png)

See [Slide 22 from “Antora: Documentation Sites for Software Teams”](https://devoxxuk-2019--opendevise-talks-docs-sites-for-software-teams.netlify.app/#22)

#### Managing Antora Specs Documentation

This guide provides a brief overview of how to manage documentation repositories (Doku-Repos) for Antora specs, including adding new repositories, structuring them appropriately, and manually triggering web documentation updates on GitHub.

##### Adding New Documentation Repositories for Antora
This is as easy as changing the Antora playbook yml file. Again, this will require you having privileged access to the repository. If you are from the organization to manage the sources and the documentation etc., you may consider opening an issue here creating a pull request to add a new source repository. We will accomodate you through the process of how the formatting and other details are to be managed so that you will be in a position to take over this mechanism onto yourself should such time arrive.

As a general introductory guide, refer to the original documentation you can find [here](https://docs.antora.org/antora/latest/playbook/content-source-url/).

Assuming the basic conditions that are mentioned are met, the following steps are to follow:

1. **Create a New Repository**: On GitHub, create a new repository to hold your AsciiDoc content. This repository will be integrated with Antora to generate your documentation site.
   
2. **Configure Antora**: In the `antora-playbook.yml` file of your documentation site generator, add the new repository under the `content.sources` section. Specify the `url` of your new repository and the `branches` to track.

   ```yaml
   content:
     sources:
       - url: https://github.com/<your-organization>/<new-repo-name>
         branches: [main]
   ```

3. **Commit and Push**: Save your changes to the `antora-playbook.yml` file, commit, and push them to your repository.

For detailed instructions, refer to [Antora's official documentation on configuring content sources](https://docs.antora.org/antora/latest/configure-content-sources/).

### Structuring Documentation Repositories for Antora

An Antora documentation repository must be structured to include at least the following:

- **Modules Directory**: Contains the documentation components, divided into multiple modules for organization.
- **Pages Directory**: Within each module, a `pages` directory holds the AsciiDoc files (.adoc) containing your documentation content.
- **Nav.adoc File**: A navigation file within each module directory to define the structure of your documentation in the generated site.

Example structure:

```
docs/
  modules/
    module-name/
      pages/
        index.adoc
      nav.adoc
```

For a comprehensive guide on structuring your documentation for Antora, see [Antora's official documentation on directory structure](https://docs.antora.org/antora/latest/standard-directories/).

### CI/CD Pipeline
This repository is scheduled to re-build and deploy the website X times a day. This means content from the source repositories are pulled and website is built again accordingly. If documentation changes are pushed to one of the source repositories, it might not appear instantly once they are pushed, you have to wait until the website rebuilds automatically.

## License
This project is under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
