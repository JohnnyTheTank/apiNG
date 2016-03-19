.. apiNG documentation master file, created by
   sphinx-quickstart on Sat Mar 19 09:30:24 2016.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to apiNG's documentation!
=================================

Contents:

.. toctree::
   :maxdepth: 2

   motivation
   implementation
   examples

Add docs here. Include other pages with by putting the under the toctree
directive above.

To build the docs to html on your machine you need to install commonmark::


  $ sudo pip install commonmark


More info about common mark


https://github.com/jgm/CommonMark

To build the docs automatically on rtfd.org:
--------------------------------------------

You need to add a webhook to your repository on github.com

Go to: https://github.com/JohnnyTheTank/apiNG/settings/hooks

Click on ``Add service`` and add ReadTheDocs.

When you push stuff to the repo, your docs will build automatically.

You will find more help here:

http://read-the-docs.readthedocs.org/en/latest/getting_started.html#in-markdown

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

